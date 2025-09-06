/**
 * Producer Validation Schemas
 * 
 * Zod schemas for producer-related entities and validation
 */

import { z } from 'zod';

// Producer Request Schemas
export const ProducerCreateRequestSchema = z.object({
  producerName: z.string()
    .min(1, 'Producer name is required')
    .max(255, 'Producer name too long')
    .trim(),
  countryId: z.string().uuid('Country ID must be a valid UUID'),
  websiteURL: z.string().url('Must be a valid URL').optional(),
  status: z.enum(['active', 'inactive'], {
    errorMap: () => ({ message: 'Status must be either active or inactive' })
  }).optional().default('active')
});

export const ProducerUpdateRequestSchema = ProducerCreateRequestSchema.partial();

// Producer Query Parameters Schema
export const ProducersQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? Math.max(1, parseInt(val)) || 1 : 1),
  limit: z.string().optional().transform(val => val ? Math.min(100, Math.max(1, parseInt(val))) || 20 : 20),
  search: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional(),
  countryId: z.string().uuid('Country ID must be a valid UUID').optional(), // Allow filtering by country
  sortBy: z.enum(['name', 'status', 'createdAt', 'updatedAt']).optional().default('name'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc')
});

// Producer API Response Schemas
export const ProducerApiResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    id: z.string().uuid(),
    producerName: z.string(),
    countryId: z.string().uuid(),
    websiteURL: z.string().url().optional(),
    status: z.enum(['active', 'inactive']),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
  }),
  message: z.string().optional()
});

export const ProducerApiListResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    producers: z.array(z.object({
      id: z.string().uuid(),
      producerName: z.string(),
      countryId: z.string().uuid(),
      websiteURL: z.string().url().optional(),
      status: z.enum(['active', 'inactive']),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime()
    })),
    pagination: z.object({
      page: z.number().int().positive(),
      limit: z.number().int().positive(),
      total: z.number().int().min(0),
      totalPages: z.number().int().min(0),
      hasNext: z.boolean(),
      hasPrevious: z.boolean()
    })
  }),
  message: z.string().optional()
});

// Type exports
export type ProducerCreateRequest = z.infer<typeof ProducerCreateRequestSchema>;
export type ProducerUpdateRequest = z.infer<typeof ProducerUpdateRequestSchema>;
export type ProducersQuery = z.infer<typeof ProducersQuerySchema>;
export type ProducerApiResponse = z.infer<typeof ProducerApiResponseSchema>;
export type ProducerApiListResponse = z.infer<typeof ProducerApiListResponseSchema>;
