import { z } from 'zod';
import { CurrencySchema } from './currency-schemas';

// Enum schemas
export const ProductTypeSchema = z.enum(['coin', 'bar', 'round']);
export const MetalTypeSchema = z.enum(['gold', 'silver', 'platinum', 'palladium']);
export const WeightUnitSchema = z.enum(['grams', 'troy_ounces', 'kilograms']);

// Specifications schema (flexible object)
export const SpecificationsSchema = z.object({
  diameter: z.number().optional(),
  thickness: z.number().optional(),
  mintage: z.number().int().optional(),
  certification: z.string().optional(),
}).passthrough(); // Allow additional properties

// Core Product schema
export const ProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  type: ProductTypeSchema,
  metal: MetalTypeSchema,
  weight: z.number().positive(),
  weightUnit: WeightUnitSchema,
  purity: z.number().min(0.001).max(1),
  price: z.number().positive(),
  currency: CurrencySchema,
  producer: z.string().min(1).max(100),
  country: z.string().max(100).optional(),
  year: z.number().int().min(1800).max(2100).optional(),
  description: z.string().max(2000).optional(),
  specifications: SpecificationsSchema.optional(),
  imageUrl: z.string().url(),
  inStock: z.boolean(),
  stockQuantity: z.number().int().min(0).optional(),
  minimumOrderQuantity: z.number().int().min(1),
  premiumPercentage: z.number().min(0).optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Product Registration schema
export const ProductRegistrationRequestSchema = z.object({
  name: z.string().min(1).max(200),
  type: ProductTypeSchema,
  metal: MetalTypeSchema,
  weight: z.number().min(0.001),
  weightUnit: WeightUnitSchema,
  purity: z.number().min(0.001).max(1),
  price: z.number().min(0.01),
  currency: CurrencySchema,
  producer: z.string().min(1).max(100),
  country: z.string().max(100).optional(),
  year: z.number().int().min(1800).max(2100).optional(),
  description: z.string().max(2000).optional(),
  specifications: SpecificationsSchema.optional(),
  inStock: z.boolean().default(true),
  stockQuantity: z.number().int().min(0).optional(),
  minimumOrderQuantity: z.number().int().min(1).default(1),
  premiumPercentage: z.number().min(0).optional(),
  tags: z.array(z.string()).optional(),
});

// Product Update schema (all fields optional except validation rules)
export const ProductUpdateRequestSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  price: z.number().min(0.01).optional(),
  description: z.string().max(2000).optional(),
  specifications: SpecificationsSchema.optional(),
  inStock: z.boolean().optional(),
  stockQuantity: z.number().int().min(0).optional(),
  minimumOrderQuantity: z.number().int().min(1).optional(),
  premiumPercentage: z.number().min(0).optional(),
  tags: z.array(z.string()).optional(),
});

// Query parameters schema
export const ProductQueryParamsSchema = z.object({
  page: z.number().int().min(1).default(1).optional(),
  limit: z.number().int().min(1).max(100).default(20).optional(),
  metal: MetalTypeSchema.optional(),
  type: ProductTypeSchema.optional(),
  producer: z.string().optional(),
});

// Pagination schema
export const PaginationSchema = z.object({
  page: z.number().int(),
  limit: z.number().int(),
  total: z.number().int(),
  totalPages: z.number().int(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

// Products response schema
export const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
  pagination: PaginationSchema,
});

// Bulk registration schemas
export const BulkRegistrationRequestSchema = z.object({
  products: z.array(ProductRegistrationRequestSchema).min(1).max(100),
});

export const BulkRegistrationResultSchema = z.object({
  product: ProductSchema.optional(),
  status: z.enum(['success', 'error']),
  error: z.string().optional(),
});

export const BulkRegistrationResponseSchema = z.object({
  success: z.boolean(),
  results: z.array(BulkRegistrationResultSchema),
  summary: z.object({
    total: z.number().int(),
    successful: z.number().int(),
    failed: z.number().int(),
  }),
});

// API Error schemas
export const ApiErrorDetailSchema = z.object({
  field: z.string(),
  message: z.string(),
});

export const ApiErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.array(ApiErrorDetailSchema).optional(),
  }),
});

export const ApiSuccessSchema = z.object({
  success: z.literal(true),
  data: z.any().optional(),
  message: z.string().optional(),
});

// Export types derived from schemas
export type ProductSchemaType = z.infer<typeof ProductSchema>;
export type ProductRegistrationRequestSchemaType = z.infer<typeof ProductRegistrationRequestSchema>;
export type ProductUpdateRequestSchemaType = z.infer<typeof ProductUpdateRequestSchema>;
export type ProductQueryParamsSchemaType = z.infer<typeof ProductQueryParamsSchema>;
export type ProductsResponseSchemaType = z.infer<typeof ProductsResponseSchema>;
export type BulkRegistrationRequestSchemaType = z.infer<typeof BulkRegistrationRequestSchema>;
export type BulkRegistrationResponseSchemaType = z.infer<typeof BulkRegistrationResponseSchema>;
export type ApiErrorSchemaType = z.infer<typeof ApiErrorSchema>;
export type ApiSuccessSchemaType = z.infer<typeof ApiSuccessSchema>;
