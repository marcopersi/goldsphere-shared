/**
 * Country Validation Schemas
 * 
 * Zod schemas for country-related entities and validation
 */

import { z } from 'zod';

// Country Request Schemas
export const CountryCreateRequestSchema = z.object({
  countryName: z.string()
    .min(1, 'Country name is required')
    .max(255, 'Country name too long')
    .trim(),
  isoCode2: z.string()
    .length(2, 'ISO code must be exactly 2 characters')
    .regex(/^[A-Z]{2}$/, 'ISO code must be uppercase letters only')
    .transform(val => val.toUpperCase())
});

export const CountryUpdateRequestSchema = CountryCreateRequestSchema.partial();

// Country Query Parameters Schema
export const CountriesQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? Math.max(1, parseInt(val)) || 1 : 1),
  limit: z.string().optional().transform(val => val ? Math.min(100, Math.max(1, parseInt(val))) || 20 : 20),
  search: z.string().optional(),
  isoCode2: z.string().length(2).optional(),
  sortBy: z.enum(['name', 'isoCode2', 'createdAt', 'updatedAt']).optional().default('name'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc')
});

// Country API Response Schemas
export const CountryApiResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    id: z.string().uuid(),
    countryName: z.string(),
    isoCode2: z.string().length(2),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
  }),
  message: z.string().optional()
});

export const CountryApiListResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    countries: z.array(z.object({
      id: z.string().uuid(),
      countryName: z.string(),
      isoCode2: z.string().length(2),
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
export type CountryCreateRequest = z.infer<typeof CountryCreateRequestSchema>;
export type CountryUpdateRequest = z.infer<typeof CountryUpdateRequestSchema>;
export type CountriesQuery = z.infer<typeof CountriesQuerySchema>;
export type CountryApiResponse = z.infer<typeof CountryApiResponseSchema>;
export type CountryApiListResponse = z.infer<typeof CountryApiListResponseSchema>;
