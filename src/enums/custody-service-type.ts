/**
 * CustodyServiceType Enum - Types of custody services available
 */
export class CustodyServiceType {
  static readonly SEGREGATED_STORAGE = new CustodyServiceType('segregated-storage', 'Segregated Storage', 'Individual allocated storage');
  static readonly ALLOCATED_STORAGE = new CustodyServiceType('allocated-storage', 'Allocated Storage', 'Specifically allocated precious metals');
  static readonly UNALLOCATED_STORAGE = new CustodyServiceType('unallocated-storage', 'Unallocated Storage', 'Pool-based storage solution');
  static readonly INSURED_STORAGE = new CustodyServiceType('insured-storage', 'Insured Storage', 'Fully insured custody service');
  static readonly VAULT_STORAGE = new CustodyServiceType('vault-storage', 'Vault Storage', 'High-security vault storage');

  private constructor(
    public readonly value: string,
    public readonly displayName: string,
    public readonly description: string
  ) {}

  static values(): CustodyServiceType[] {
    return [this.SEGREGATED_STORAGE, this.ALLOCATED_STORAGE, this.UNALLOCATED_STORAGE, this.INSURED_STORAGE, this.VAULT_STORAGE];
  }

  static fromValue(value: string): CustodyServiceType | undefined {
    return this.values().find(type => type.value === value);
  }

  toString(): string {
    return this.value;
  }

  toJSON(): { value: string; displayName: string; description: string } {
    return { value: this.value, displayName: this.displayName, description: this.description };
  }
}
