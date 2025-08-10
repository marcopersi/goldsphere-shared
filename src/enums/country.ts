/**
 * Country Enum - Countries supported by GoldSphere platform
 */
export class Country {
  static readonly CANADA = new Country('CA', 'Canada');
  static readonly USA = new Country('US', 'USA');
  static readonly AUSTRALIA = new Country('AU', 'Australia');
  static readonly SOUTH_AFRICA = new Country('ZA', 'South Africa');
  static readonly SWITZERLAND = new Country('CH', 'Switzerland');
  static readonly CHINA = new Country('CN', 'China');
  static readonly RUSSIA = new Country('RU', 'Russia');
  static readonly GERMANY = new Country('DE', 'Germany');
  static readonly AUSTRIA = new Country('AT', 'Austria');
  static readonly UNITED_KINGDOM = new Country('GB', 'United Kingdom');
  static readonly FRANCE = new Country('FR', 'France');
  static readonly ITALY = new Country('IT', 'Italy');

  private constructor(
    public readonly isoCode2: string,
    public readonly name: string
  ) {}

  static values(): Country[] {
    return [
      this.CANADA, this.USA, this.AUSTRALIA, this.SOUTH_AFRICA,
      this.SWITZERLAND, this.CHINA, this.RUSSIA, this.GERMANY, 
      this.AUSTRIA, this.UNITED_KINGDOM, this.FRANCE, this.ITALY
    ];
  }

  static fromIsoCode2(code: string): Country | undefined {
    return this.values().find(c => c.isoCode2.toLowerCase() === code.toLowerCase());
  }

  static fromName(name: string): Country | undefined {
    return this.values().find(c => c.name.toLowerCase() === name.toLowerCase());
  }

  get code(): string {
    return this.isoCode2.toLowerCase();
  }

  toString(): string {
    return this.isoCode2;
  }

  toJSON(): { code: string; name: string } {
    return { code: this.code, name: this.name };
  }
}
