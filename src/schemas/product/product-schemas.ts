/**
 * Product Validation Schemas
 * 
 * Zod schemas for product-related entities and validation
 */

import { z } from 'zod';
import { ProductSchema } from '../../validation/product-schemas';
import { CommonPaginationSchema } from '../../validation/common-schemas';

// Enhanced Product Creation/Update Request Schemas
export const ProductCreateRequestSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  productTypeId: z.string().uuid('Invalid product type ID'),
  metalId: z.string().uuid('Invalid metal ID'),
  countryId: z.string().uuid('Invalid country ID').optional(), // Unified naming (was: issuingCountryId)
  producerId: z.string().uuid('Invalid producer ID'),
  fineWeight: z.number().positive('Weight must be positive'),
  unitOfMeasure: z.string().min(1, 'Unit of measure is required'),
  purity: z.number().min(0).max(1, 'Purity must be between 0 and 1').optional(),
  price: z.number().min(0, 'Price must be non-negative'),
  currency: z.string().length(3, 'Currency must be 3 characters').optional().default('CHF'),
  productYear: z.number().int().min(1000).max(new Date().getFullYear() + 1).optional(),
  description: z.string().optional(),
  imageFilename: z.string().optional(),
  inStock: z.boolean().optional().default(true),
  stockQuantity: z.number().int().min(0, 'Stock quantity cannot be negative').optional().default(0),
  minimumOrderQuantity: z.number().int().positive('Minimum order quantity must be positive').optional().default(1),
  premiumPercentage: z.number().min(0, 'Premium percentage cannot be negative').optional(),
  diameter: z.number().positive('Diameter must be positive').optional(),
  thickness: z.number().positive('Thickness must be positive').optional(),
  mintage: z.number().int().positive('Mintage must be positive').optional(),
  certification: z.string().optional()
});

export const ProductUpdateRequestSchema = ProductCreateRequestSchema.partial();

// Product Query Parameters Schema
export const ProductsQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? Math.max(1, parseInt(val)) || 1 : 1),
  limit: z.string().optional().transform(val => val ? Math.min(100, Math.max(1, parseInt(val))) || 20 : 20),
  search: z.string().optional(),
  metal: z.string().optional(),
  type: z.string().optional(), 
  producer: z.string().optional(),
  country: z.string().optional(),
  inStock: z.string().optional().transform(val => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    return undefined;
  }),
  minPrice: z.string().optional().transform(val => val ? Math.max(0, parseFloat(val)) || undefined : undefined),
  maxPrice: z.string().optional().transform(val => val ? Math.max(0, parseFloat(val)) || undefined : undefined),
  sortBy: z.enum(['name', 'price', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
});

// Product API Response Schemas
export const ProductApiResponseSchema = z.object({
  success: z.literal(true),
  data: ProductSchema, // Extends existing ProductSchema
  message: z.string().optional()
});

export const ProductApiListResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    products: z.array(ProductSchema),
    pagination: CommonPaginationSchema // Use existing pagination schema
  }),
  message: z.string().optional(),
  filters: z.record(z.string(), z.any()).optional()
});

// Type exports
export type ProductCreateRequest = z.infer<typeof ProductCreateRequestSchema>;
export type ProductUpdateRequest = z.infer<typeof ProductUpdateRequestSchema>;
export type ProductsQuery = z.infer<typeof ProductsQuerySchema>;
export type ProductApiResponse = z.infer<typeof ProductApiResponseSchema>;
export type ProductApiListResponse = z.infer<typeof ProductApiListResponseSchema>;
