import { z } from 'zod';

export const CurrencySchema = z.enum(['EUR', 'USD', 'GBP', 'CHF']);
