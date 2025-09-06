/**
 * Transaction Validation Schemas
 * 
 * Zod schemas for transaction-related entities and validation
 */

import { z } from 'zod';

export const TransactionQueryParamsSchema = z.object({
  page: z.string().optional().transform(val => Math.max(1, parseInt(val || '1', 10))),
  limit: z.string().optional().transform(val => Math.min(100, Math.max(1, parseInt(val || '50', 10)))),
  type: z.enum(['buy', 'sell']).optional(),
  positionId: z.string().uuid({ message: 'Invalid position ID format' }).optional(),
  dateFrom: z.string().datetime({ message: 'Invalid date format' }).optional(),
  dateTo: z.string().datetime({ message: 'Invalid date format' }).optional(),
  minQuantity: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  maxQuantity: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  minPrice: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  maxPrice: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  sortBy: z.enum(['date', 'quantity', 'price', 'total', 'createdAt']).default('date'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export const CreateTransactionRequestSchema = z.object({
  positionId: z.string().uuid({ message: 'Invalid position ID' }),
  type: z.enum(['buy', 'sell'], { message: 'Transaction type is required' }),
  date: z.string().datetime({ message: 'Invalid date format. Expected ISO 8601 datetime' }),
  quantity: z.number().positive({ message: 'Quantity must be positive' }),
  price: z.number().positive({ message: 'Price must be positive' }),
  fees: z.number().min(0, { message: 'Fees cannot be negative' }).default(0),
  notes: z.string().max(500, { message: 'Notes cannot exceed 500 characters' }).optional()
});

export type TransactionQuery = z.infer<typeof TransactionQueryParamsSchema>;
export type CreateTransactionRequest = z.infer<typeof CreateTransactionRequestSchema>;
