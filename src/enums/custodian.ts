/**
 * Custodian Enum - Custody service providers for precious metals storage
 */
export class Custodian {
  static readonly LOOMIS = new Custodian('loomis', 'Loomis');
  static readonly BRINKS = new Custodian('brinks', 'Brinks');
  static readonly BANK_OF_SWITZERLAND = new Custodian('bank-of-switzerland', 'Bank of Switzerland');
  static readonly HOME_STORAGE = new Custodian('home-storage', 'Home Storage');
  static readonly MALCA_AMIT = new Custodian('malca-amit', 'Malca-Amit');
  static readonly G4S_VAULTS = new Custodian('g4s-vaults', 'G4S Vaults');
  static readonly SWISS_GOLD_SAFE = new Custodian('swiss-gold-safe', 'Swiss Gold Safe');
  static readonly VIA_MAT_INTERNATIONAL = new Custodian('via-mat-international', 'Via Mat International');
  static readonly VAULT_SERVICES_SEQUEL = new Custodian('vault-services-sequel', 'Vault Services by Sequel');
  static readonly DELAWARE_DEPOSITORY = new Custodian('delaware-depository', 'Delaware Depository');
  static readonly INTERNATIONAL_DEPOSITORY = new Custodian('international-depository', 'International Depository Services');

  private constructor(
    public readonly value: string,
    public readonly name: string
  ) {}

  static values(): Custodian[] {
    return [
      this.LOOMIS, this.BRINKS, this.BANK_OF_SWITZERLAND, this.HOME_STORAGE,
      this.MALCA_AMIT, this.G4S_VAULTS, this.SWISS_GOLD_SAFE, this.VIA_MAT_INTERNATIONAL,
      this.VAULT_SERVICES_SEQUEL, this.DELAWARE_DEPOSITORY, this.INTERNATIONAL_DEPOSITORY
    ];
  }

  static fromValue(value: string): Custodian | undefined {
    return this.values().find(custodian => custodian.value === value);
  }

  static fromName(name: string): Custodian | undefined {
    return this.values().find(custodian => custodian.name === name);
  }

  toString(): string {
    return this.value;
  }

  toJSON(): { value: string; name: string } {
    return { value: this.value, name: this.name };
  }
}
