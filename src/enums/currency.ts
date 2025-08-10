/**
 * Currency Enum - Currencies supported by GoldSphere platform
 */
export class Currency {
  static readonly USD = new Currency('US', 'USD', 840);
  static readonly EUR = new Currency('EU', 'EUR', 978);
  static readonly CHF = new Currency('CH', 'CHF', 756);
  static readonly GBP = new Currency('GB', 'GBP', 826);
  static readonly CAD = new Currency('CA', 'CAD', 124);
  static readonly AUD = new Currency('AU', 'AUD', 36);

  private constructor(
    public readonly countryCode: string, // ISO 3166-1 alpha-2 country code
    public readonly isoCode3: string,    // ISO 4217 3-letter currency code
    public readonly isoNumericCode: number // ISO 4217 numeric code
  ) {}

  static values(): Currency[] {
    return [this.USD, this.EUR, this.CHF, this.GBP, this.CAD, this.AUD];
  }

  static fromCountryCode(code: string): Currency | undefined {
    return this.values().find(c => c.countryCode.toLowerCase() === code.toLowerCase());
  }

  static fromIsoCode3(code: string): Currency | undefined {
    return this.values().find(c => c.isoCode3.toLowerCase() === code.toLowerCase());
  }

  static fromNumericCode(code: number): Currency | undefined {
    return this.values().find(c => c.isoNumericCode === code);
  }

  toString(): string {
    return this.isoCode3;
  }

  toJSON(): { countryCode: string; isoCode3: string; isoNumericCode: number } {
    return { 
      countryCode: this.countryCode, 
      isoCode3: this.isoCode3, 
      isoNumericCode: this.isoNumericCode 
    };
  }
}
