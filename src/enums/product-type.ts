/**
 * ProductType Enum - Types of precious metal products
 */
export class ProductType {
  static readonly COIN = new ProductType('Coin');
  static readonly BAR = new ProductType('Bar');
  static readonly MEDALLION = new ProductType('Medallion');
  static readonly JEWELRY = new ProductType('Jewelry');
  static readonly CAST_BAR = new ProductType('Cast Bar');
  static readonly MINTED_BAR = new ProductType('Minted Bar');
  static readonly COMBI_BAR = new ProductType('CombiBar');

  private constructor(
    public readonly name: string
  ) {}

  static values(): ProductType[] {
    return [
      this.COIN, this.BAR, this.MEDALLION, this.JEWELRY,
      this.CAST_BAR, this.MINTED_BAR, this.COMBI_BAR
    ];
  }

  static fromName(name: string): ProductType | undefined {
    return this.values().find(pt => pt.name === name);
  }

  toString(): string {
    return this.name;
  }

  toJSON(): { name: string } {
    return { name: this.name };
  }
}
