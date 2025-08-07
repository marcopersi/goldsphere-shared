import { z } from 'zod';

// Enum schemas
export const PositionStatusSchema = z.enum(['active', 'closed']);
export const TransactionTypeSchema = z.enum(['buy', 'sell']);

// Core Position schema
export const PositionSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  productId: z.string().min(1),
  purchaseDate: z.string().datetime(),
  purchasePrice: z.number().positive(),
  marketPrice: z.number().positive(),
  quantity: z.number().positive(),
  issuingCountry: z.string().min(1).max(100),
  producer: z.string().min(1).max(100),
  certifiedProvenance: z.boolean(),
  status: PositionStatusSchema,
  closedDate: z.string().datetime().optional(),
  notes: z.string().max(1000).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Position creation schema
export const PositionCreateRequestSchema = z.object({
  productId: z.string().min(1),
  purchaseDate: z.string().datetime(),
  purchasePrice: z.number().min(0.01),
  quantity: z.number().min(0.001),
  issuingCountry: z.string().min(1).max(100),
  producer: z.string().min(1).max(100),
  certifiedProvenance: z.boolean(),
  notes: z.string().max(1000).optional(),
});

// Position update schema
export const PositionUpdateRequestSchema = z.object({
  marketPrice: z.number().min(0.01).optional(),
  quantity: z.number().min(0.001).optional(),
  notes: z.string().max(1000).optional(),
  status: PositionStatusSchema.optional(),
});

// Transaction schema
export const TransactionSchema = z.object({
  id: z.string().min(1),
  positionId: z.string().min(1),
  userId: z.string().min(1),
  type: TransactionTypeSchema,
  date: z.string().datetime(),
  quantity: z.number().min(0.001),
  price: z.number().min(0.01),
  fees: z.number().min(0).default(0),
  notes: z.string().max(500).optional(),
  createdAt: z.string().datetime(),
});

// Transaction creation schema
export const TransactionCreateRequestSchema = z.object({
  positionId: z.string().min(1),
  type: TransactionTypeSchema,
  date: z.string().datetime(),
  quantity: z.number().min(0.001),
  price: z.number().min(0.01),
  fees: z.number().min(0).default(0),
  notes: z.string().max(500).optional(),
});

// Transaction history item schema
export const TransactionHistoryItemSchema = TransactionSchema.extend({
  productName: z.string(),
  total: z.number(),
});

// Portfolio summary schemas
export const MetalBreakdownSchema = z.object({
  value: z.number(),
  percentage: z.number(),
  weight: z.number(),
  positionCount: z.number().int(),
});

export const PortfolioSummarySchema = z.object({
  totalValue: z.number(),
  totalCost: z.number(),
  totalGainLoss: z.number(),
  totalGainLossPercentage: z.number(),
  positionCount: z.number().int(),
  metalBreakdown: z.object({
    gold: MetalBreakdownSchema.optional(),
    silver: MetalBreakdownSchema.optional(),
    platinum: MetalBreakdownSchema.optional(),
    palladium: MetalBreakdownSchema.optional(),
  }),
  lastUpdated: z.string().datetime(),
});

// Query parameters schemas
export const PositionQueryParamsSchema = z.object({
  page: z.number().int().min(1).default(1).optional(),
  limit: z.number().int().min(1).max(100).default(20).optional(),
  status: PositionStatusSchema.optional(),
  metal: z.enum(['gold', 'silver', 'platinum', 'palladium']).optional(),
  producer: z.string().optional(),
});

export const TransactionQueryParamsSchema = z.object({
  page: z.number().int().min(1).default(1).optional(),
  limit: z.number().int().min(1).max(100).default(20).optional(),
  type: TransactionTypeSchema.optional(),
  positionId: z.string().optional(),
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
});

// Response schemas
export const PositionsResponseSchema = z.object({
  positions: z.array(PositionSchema),
  pagination: z.object({
    page: z.number().int(),
    limit: z.number().int(),
    total: z.number().int(),
    totalPages: z.number().int(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

export const TransactionsResponseSchema = z.object({
  transactions: z.array(TransactionHistoryItemSchema),
  pagination: z.object({
    page: z.number().int(),
    limit: z.number().int(),
    total: z.number().int(),
    totalPages: z.number().int(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

// Export types derived from schemas
export type PositionSchemaType = z.infer<typeof PositionSchema>;
export type PositionCreateRequestSchemaType = z.infer<typeof PositionCreateRequestSchema>;
export type PositionUpdateRequestSchemaType = z.infer<typeof PositionUpdateRequestSchema>;
export type TransactionSchemaType = z.infer<typeof TransactionSchema>;
export type TransactionCreateRequestSchemaType = z.infer<typeof TransactionCreateRequestSchema>;
export type TransactionHistoryItemSchemaType = z.infer<typeof TransactionHistoryItemSchema>;
export type PortfolioSummarySchemaType = z.infer<typeof PortfolioSummarySchema>;
export type MetalBreakdownSchemaType = z.infer<typeof MetalBreakdownSchema>;
export type PositionQueryParamsSchemaType = z.infer<typeof PositionQueryParamsSchema>;
export type TransactionQueryParamsSchemaType = z.infer<typeof TransactionQueryParamsSchema>;
export type PositionsResponseSchemaType = z.infer<typeof PositionsResponseSchema>;
export type TransactionsResponseSchemaType = z.infer<typeof TransactionsResponseSchema>;
