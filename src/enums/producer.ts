/**
 * Producer Enum - Precious metal producers/mints
 */
export class Producer {
  static readonly ROYAL_CANADIAN_MINT = new Producer('RCM', 'Royal Canadian Mint', 'CA');
  static readonly PERTH_MINT = new Producer('PM', 'Perth Mint', 'AU');
  static readonly UNITED_STATES_MINT = new Producer('USM', 'United States Mint', 'US');
  static readonly SWISS_PAMP = new Producer('PAMP', 'PAMP Suisse', 'CH');
  static readonly AUSTRIAN_MINT = new Producer('AM', 'Austrian Mint', 'AT');
  static readonly SOUTH_AFRICAN_MINT = new Producer('SAM', 'South African Mint', 'ZA');
  static readonly BRITISH_ROYAL_MINT = new Producer('BRM', 'British Royal Mint', 'GB');
  static readonly UMICORE = new Producer('UMI', 'Umicore', 'BE');
  static readonly VALCAMBI = new Producer('VAL', 'Valcambi', 'CH');
  static readonly CREDIT_SUISSE = new Producer('CS', 'Credit Suisse', 'CH');

  private constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly countryCode: string
  ) {}

  static values(): Producer[] {
    return [
      this.ROYAL_CANADIAN_MINT, this.PERTH_MINT, this.UNITED_STATES_MINT,
      this.SWISS_PAMP, this.AUSTRIAN_MINT, this.SOUTH_AFRICAN_MINT,
      this.BRITISH_ROYAL_MINT, this.UMICORE, this.VALCAMBI, this.CREDIT_SUISSE
    ];
  }

  static fromCode(code: string): Producer | undefined {
    return this.values().find(p => p.code.toLowerCase() === code.toLowerCase());
  }

  static fromName(name: string): Producer | undefined {
    return this.values().find(p => p.name.toLowerCase() === name.toLowerCase());
  }

  static fromCountry(countryCode: string): Producer[] {
    return this.values().filter(p => p.countryCode.toLowerCase() === countryCode.toLowerCase());
  }

  toString(): string {
    return this.name;
  }

  toJSON(): { code: string; name: string; countryCode: string } {
    return { code: this.code, name: this.name, countryCode: this.countryCode };
  }
}
