/**
 * OrderStatus Enum - Status of trading orders
 */
export class OrderStatus {
  static readonly PENDING = new OrderStatus('pending', 'Pending', 'Order received and awaiting processing');
  static readonly PROCESSING = new OrderStatus('processing', 'Processing', 'Order is being processed');
  static readonly SHIPPED = new OrderStatus('shipped', 'Shipped', 'Order has been shipped');
  static readonly DELIVERED = new OrderStatus('delivered', 'Delivered', 'Order has been delivered');
  static readonly CANCELLED = new OrderStatus('cancelled', 'Cancelled', 'Order has been cancelled');

  private constructor(
    public readonly value: string,
    public readonly displayName: string,
    public readonly description: string
  ) {}

  static values(): OrderStatus[] {
    return [this.PENDING, this.PROCESSING, this.SHIPPED, this.DELIVERED, this.CANCELLED];
  }

  static fromValue(value: string): OrderStatus | undefined {
    return this.values().find(os => os.value.toLowerCase() === value.toLowerCase());
  }

  get isActive(): boolean {
    return this === OrderStatus.PENDING || this === OrderStatus.PROCESSING || this === OrderStatus.SHIPPED;
  }

  get isCompleted(): boolean {
    return this === OrderStatus.DELIVERED || this === OrderStatus.CANCELLED;
  }

  toString(): string {
    return this.value;
  }

  toJSON(): { value: string; displayName: string; description: string } {
    return { value: this.value, displayName: this.displayName, description: this.description };
  }
}
