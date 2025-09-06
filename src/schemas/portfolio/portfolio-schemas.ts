/**
 * Portfolio Validation Schemas
 * 
 * Zod schemas for portfolio-related entities and validation
 */

import { z } from 'zod';

// Helper schemas
const UuidSchema = z.string().uuid();
const TimestampSchema = z.string().datetime();

// Portfolio Schema
export const PortfolioSchema = z.object({
  id: UuidSchema,
  portfolioName: z.string().min(1).max(200),
  ownerId: UuidSchema,
  description: z.string().max(1000).optional(),
  isActive: z.boolean().default(true),
  totalValue: z.number().min(0).default(0),
  totalCost: z.number().min(0).default(0),
  totalGainLoss: z.number().default(0),
  totalGainLossPercentage: z.number().default(0),
  positionCount: z.number().int().min(0).default(0),
  lastUpdated: TimestampSchema,
  createdAt: TimestampSchema,
  updatedAt: TimestampSchema
});

export const CreatePortfolioRequestSchema = z.object({
  portfolioName: z.string().min(1, 'Portfolio name is required').max(200, 'Portfolio name too long'),
  ownerId: UuidSchema,
  description: z.string().max(1000, 'Description too long').optional()
});

export const UpdatePortfolioRequestSchema = z.object({
  portfolioName: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  isActive: z.boolean().optional()
});

export const PortfoliosQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? Math.max(1, parseInt(val)) || 1 : 1),
  limit: z.string().optional().transform(val => val ? Math.min(100, Math.max(1, parseInt(val))) || 20 : 20),
  search: z.string().optional(),
  sortBy: z.enum(['portfolioName', 'totalValue', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  isActive: z.string().optional().transform(val => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    return undefined;
  })
});

// Type exports
export type Portfolio = z.infer<typeof PortfolioSchema>;
export type CreatePortfolioRequest = z.infer<typeof CreatePortfolioRequestSchema>;
export type UpdatePortfolioRequest = z.infer<typeof UpdatePortfolioRequestSchema>;
export type PortfoliosQuery = z.infer<typeof PortfoliosQuerySchema>;
