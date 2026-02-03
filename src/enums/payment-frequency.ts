/**
 * PaymentFrequency Enum - Payment frequency options for custody services
 */
export class PaymentFrequency {
  static readonly DAILY = new PaymentFrequency('daily', 'Daily', 'Charged every day');
  static readonly WEEKLY = new PaymentFrequency('weekly', 'Weekly', 'Charged every week');
  static readonly MONTHLY = new PaymentFrequency('monthly', 'Monthly', 'Charged every month');
  static readonly QUARTERLY = new PaymentFrequency('quarterly', 'Quarterly', 'Charged every quarter');
  static readonly YEARLY = new PaymentFrequency('yearly', 'Yearly', 'Charged annually');
  static readonly ONETIME = new PaymentFrequency('onetime', 'One Time', 'Charged once');

  private constructor(
    public readonly value: string,
    public readonly displayName: string,
    public readonly description: string
  ) {}

  static values(): PaymentFrequency[] {
    return [this.DAILY, this.WEEKLY, this.MONTHLY, this.QUARTERLY, this.YEARLY, this.ONETIME];
  }

  static fromValue(value: string): PaymentFrequency | undefined {
    return this.values().find(frequency => frequency.value === value);
  }

  toString(): string {
    return this.value;
  }

  toJSON(): { value: string; displayName: string; description: string } {
    return { value: this.value, displayName: this.displayName, description: this.description };
  }
}
