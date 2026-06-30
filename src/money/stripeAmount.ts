/**
 * Stripe amount conversion helpers.
 *
 * Stripe expects amounts in the smallest currency unit ("minor units") as a
 * positive integer. The number of minor units per major unit depends on the
 * currency:
 *  - zero-decimal currencies (e.g. JPY) use the major unit directly (factor 1)
 *  - most currencies (e.g. USD, EUR, CHF) use 2 decimals (factor 100)
 *  - three-decimal currencies (e.g. BHD, KWD) use 3 decimals (factor 1000),
 *    but Stripe additionally requires the amount to be rounded to the nearest
 *    ten minor units (the last digit must be 0).
 *
 * Using a fixed `* 100` / `/ 100` conversion overcharges/undercharges these
 * special currencies, so all Stripe amount conversions must go through these
 * helpers.
 *
 * Reference: https://docs.stripe.com/currencies#zero-decimal
 */

/** Currencies Stripe treats as zero-decimal (charge the major-unit amount as-is). */
export const STRIPE_ZERO_DECIMAL_CURRENCIES: ReadonlySet<string> = new Set([
  'BIF', 'CLP', 'DJF', 'GNF', 'JPY', 'KMF', 'KRW', 'MGA', 'PYG',
  'RWF', 'UGX', 'VND', 'VUV', 'XAF', 'XOF', 'XPF',
]);

/** Currencies Stripe treats as three-decimal (amount must be a multiple of ten minor units). */
export const STRIPE_THREE_DECIMAL_CURRENCIES: ReadonlySet<string> = new Set([
  'BHD', 'JOD', 'KWD', 'OMR', 'TND',
]);

/**
 * Returns the number of decimal places Stripe uses for the given currency.
 * Defaults to 2 for any currency not in the special-case sets.
 */
export function getStripeCurrencyDecimals(currency: string): 0 | 2 | 3 {
  const code = currency.toUpperCase();
  if (STRIPE_ZERO_DECIMAL_CURRENCIES.has(code)) {
    return 0;
  }
  if (STRIPE_THREE_DECIMAL_CURRENCIES.has(code)) {
    return 3;
  }
  return 2;
}

/**
 * Converts a major-unit amount (e.g. `46.59`) into the Stripe minor-unit
 * integer for the given currency (e.g. `4659` for USD, `47` for JPY).
 */
export function toStripeMinorUnits(amount: number, currency: string): number {
  const decimals = getStripeCurrencyDecimals(currency);
  if (decimals === 3) {
    // Three-decimal currencies must be rounded to the nearest ten minor units.
    return Math.round(amount * 100) * 10;
  }
  const factor = decimals === 0 ? 1 : 100;
  return Math.round(amount * factor);
}

/**
 * Converts a Stripe minor-unit integer back into a major-unit amount for the
 * given currency. Inverse of {@link toStripeMinorUnits} for display purposes.
 */
export function fromStripeMinorUnits(minorAmount: number, currency: string): number {
  const decimals = getStripeCurrencyDecimals(currency);
  const factor = decimals === 0 ? 1 : decimals === 3 ? 1000 : 100;
  return minorAmount / factor;
}
