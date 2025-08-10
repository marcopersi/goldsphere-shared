/**
 * Metal Enum - Precious metals supported by GoldSphere platform
 */
export class Metal {
  static readonly GOLD = new Metal('AU', 'Gold');
  static readonly SILVER = new Metal('AG', 'Silver');
  static readonly PALLADIUM = new Metal('PD', 'Palladium');
  static readonly PLATINUM = new Metal('PT', 'Platinum');

  private constructor(
    public readonly symbol: string,
    public readonly name: string
  ) {}

  static values(): Metal[] {
    return [this.GOLD, this.SILVER, this.PALLADIUM, this.PLATINUM];
  }

  static fromSymbol(symbol: string): Metal | undefined {
    return this.values().find(m => m.symbol === symbol);
  }

  static fromName(name: string): Metal | undefined {
    return this.values().find(m => m.name === name);
  }

  toString(): string {
    return this.symbol;
  }

  toJSON(): { symbol: string; name: string } {
    return { symbol: this.symbol, name: this.name };
  }
}
