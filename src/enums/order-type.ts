/**
 * OrderType Enum - Types of trading orders
 */
export class OrderType {
  static readonly BUY = new OrderType('buy', 'Buy Order');
  static readonly SELL = new OrderType('sell', 'Sell Order');
  static readonly STOP_LOSS = new OrderType('stopLoss', 'Stop Loss Order');
  static readonly LIMIT = new OrderType('limit', 'Limit Order');
  static readonly MARKET = new OrderType('market', 'Market Order');

  private constructor(
    public readonly value: string,
    public readonly displayName: string
  ) {}

  static values(): OrderType[] {
    return [this.BUY, this.SELL, this.STOP_LOSS, this.LIMIT, this.MARKET];
  }

  static fromValue(value: string): OrderType | undefined {
    return this.values().find(ot => ot.value.toLowerCase() === value.toLowerCase());
  }

  toString(): string {
    return this.value;
  }

  toJSON(): { value: string; displayName: string } {
    return { value: this.value, displayName: this.displayName };
  }
}
