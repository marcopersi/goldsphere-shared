/**
 * OrderSource Enum - Source/channel where orders originate
 */
export class OrderSource {
  static readonly WEB = new OrderSource('web', 'Web Application', 'Order placed through the web application');
  static readonly MOBILE = new OrderSource('mobile', 'Mobile Application', 'Order placed through the mobile app');
  static readonly API = new OrderSource('api', 'API Direct', 'Order placed directly via API call');
  static readonly ADMIN = new OrderSource('admin', 'Admin Portal', 'Order created by administrator');
  static readonly IMPORT = new OrderSource('import', 'Data Import', 'Order imported from external system');
  static readonly PHONE = new OrderSource('phone', 'Phone Order', 'Order placed via phone call');

  private constructor(
    public readonly value: string,
    public readonly displayName: string,
    public readonly description: string
  ) {}

  static values(): OrderSource[] {
    return [this.WEB, this.MOBILE, this.API, this.ADMIN, this.IMPORT, this.PHONE];
  }

  static fromValue(value: string): OrderSource | undefined {
    return this.values().find(os => os.value.toLowerCase() === value.toLowerCase());
  }

  get isUserInitiated(): boolean {
    return this === OrderSource.WEB || this === OrderSource.MOBILE || this === OrderSource.PHONE;
  }

  get isSystemGenerated(): boolean {
    return this === OrderSource.API || this === OrderSource.ADMIN || this === OrderSource.IMPORT;
  }

  toString(): string {
    return this.value;
  }

  toJSON(): { value: string; displayName: string; description: string } {
    return { value: this.value, displayName: this.displayName, description: this.description };
  }
}
