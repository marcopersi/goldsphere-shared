/**
 * OrderSource Zod Schema
 * 
 * Simplified Zod schema for OrderSource validation
 */

import { z } from 'zod';

export const OrderSourceSchema = z.enum([
  'web',
  'mobile', 
  'api',
  'admin',
  'import',
  'phone'
], {
  error: 'Invalid order source'
});

export type OrderSourceType = z.infer<typeof OrderSourceSchema>;
