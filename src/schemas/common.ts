/**
 * Common Schema Definitions
 * 
 * Shared Zod schemas used across the GoldSphere platform
 */

import { z } from 'zod';

// Pagination schema
export const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
});

// Generic success response
export const SuccessResponseSchema = z.object({
  success: z.boolean().default(true),
  message: z.string().optional()
});

// Generic error response
export const ErrorResponseSchema = z.object({
  success: z.boolean().default(false),
  error: z.string(),
  code: z.string().optional(),
  details: z.any().optional()
});
