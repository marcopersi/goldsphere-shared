import { z } from 'zod';
import { MetalEnumSchema, ProductTypeEnumSchema, CountryEnumSchema, CurrencyEnumSchema } from './enum-schemas';
import { CommonPaginationSchema } from './common-schemas';

// Weight unit enum matching database
export const WeightUnitSchema = z.enum(['grams', 'troy_ounces', 'kilograms']);

// Metal object schema (matches API response structure)
export const MetalObjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  symbol: z.string().length(2)
});

// Core Product schema (aligned with database structure)
export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255), // Matches database TEXT constraint
  
  // Type information (enum values for API, IDs for database operations)
  type: ProductTypeEnumSchema,
  productTypeId: z.string().uuid(), // Database foreign key
  
  // Metal information (complex object for API response)
  metal: MetalObjectSchema, 
  metalId: z.string().uuid(), // Database foreign key
  
  // Producer information  
  producer: z.string().min(1).max(255), // Producer name for API
  producerId: z.string().uuid(), // Database foreign key
  
  // Country information (optional)
  country: CountryEnumSchema.optional(),
  issuingCountryId: z.string().uuid().optional(), // Database foreign key
  
  // Physical characteristics
  weight: z.number().positive(),
  weightUnit: WeightUnitSchema,
  purity: z.number().min(0.001).max(1),
  
  // Pricing
  price: z.number().positive(),
  currency: CurrencyEnumSchema,
  premiumPercentage: z.number().min(0).optional(),
  
  // Product details
  year: z.number().int().min(1800).max(2100).optional(),
  description: z.string().max(2000).optional(),
  
  // Database-specific fields
  certifiedProvenance: z.boolean().default(false),
  
  // Inventory management
  imageUrl: z.string().url(),
  imageFilename: z.string().optional(), // Database field
  inStock: z.boolean(),
  stockQuantity: z.number().int().min(0).optional(),
  minimumOrderQuantity: z.number().int().min(1),
  
  // Physical specifications (direct fields)
  diameter: z.number().positive().optional(),
  thickness: z.number().positive().optional(),
  mintage: z.number().int().positive().optional(),
  certification: z.string().max(255).optional(),
  
  // Metadata
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

// Product Registration schema (for creating new products)
export const ProductRegistrationRequestSchema = z.object({
  name: z.string().min(1).max(255),
  productTypeId: z.string().uuid(), // Require database ID for creation
  metalId: z.string().uuid(),       // Require database ID for creation  
  producerId: z.string().uuid(),    // Require database ID for creation
  issuingCountryId: z.string().uuid().optional(),
  
  weight: z.number().positive(),
  weightUnit: WeightUnitSchema.default('troy_ounces'),
  purity: z.number().min(0.001).max(1).default(0.999),
  
  price: z.number().positive(),
  currency: CurrencyEnumSchema.default('USD'),
  premiumPercentage: z.number().min(0).optional(),
  
  year: z.number().int().min(1800).max(2100).optional(),
  description: z.string().max(2000).optional(),
  
  certifiedProvenance: z.boolean().default(false),
  
  imageUrl: z.string().url().optional(), // Optional for creation
  inStock: z.boolean().default(true),
  stockQuantity: z.number().int().min(0).default(0),
  minimumOrderQuantity: z.number().int().min(1).default(1),
  
  // Physical specifications
  diameter: z.number().positive().optional(),
  thickness: z.number().positive().optional(),
  mintage: z.number().int().positive().optional(), 
  certification: z.string().max(255).optional(),
});

// Product Update schema (all fields optional except validation rules)
export const ProductUpdateRequestSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  
  // Allow updating reference IDs (admin operation)
  productTypeId: z.string().uuid().optional(),
  metalId: z.string().uuid().optional(),
  producerId: z.string().uuid().optional(),
  issuingCountryId: z.string().uuid().optional(),
  
  // Physical characteristics
  weight: z.number().positive().optional(),
  weightUnit: WeightUnitSchema.optional(),
  purity: z.number().min(0.001).max(1).optional(),
  
  // Pricing
  price: z.number().positive().optional(),
  currency: CurrencyEnumSchema.optional(),
  premiumPercentage: z.number().min(0).optional(),
  
  // Product details
  year: z.number().int().min(1800).max(2100).optional(),
  description: z.string().max(2000).optional(),
  certifiedProvenance: z.boolean().optional(),
  
  // Inventory
  imageUrl: z.string().url().optional(),
  inStock: z.boolean().optional(),
  stockQuantity: z.number().int().min(0).optional(),
  minimumOrderQuantity: z.number().int().min(1).optional(),
  
  // Physical specifications
  diameter: z.number().positive().optional(),
  thickness: z.number().positive().optional(),
  mintage: z.number().int().positive().optional(),
  certification: z.string().max(255).optional(),
});

// Enhanced query parameters schema
export const ProductQueryParamsSchema = z.object({
  page: z.number().int().min(1).default(1).optional(),
  limit: z.number().int().min(1).max(100).default(20).optional(),
  search: z.string().max(255).optional(), // For name/description search
  
  // Filter by database IDs (more precise)
  metalId: z.string().uuid().optional(),
  productTypeId: z.string().uuid().optional(), 
  producerId: z.string().uuid().optional(),
  issuingCountryId: z.string().uuid().optional(),
  
  // Filter by enum values (user-friendly)
  metal: MetalEnumSchema.optional(),
  type: ProductTypeEnumSchema.optional(),
  
  // Additional filters
  inStock: z.boolean().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  year: z.number().int().min(1800).max(2100).optional(),
  certifiedProvenance: z.boolean().optional(),
  
  // Sorting
  sortBy: z.enum(['name', 'price', 'createdAt', 'updatedAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc').optional(),
});

// Products response schema
export const ProductsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    products: z.array(ProductSchema),
    pagination: CommonPaginationSchema,
    filters: z.object({
      totalCount: z.number().int(),
      filteredCount: z.number().int(),
      appliedFilters: z.record(z.any()).optional(),
    }).optional(),
  }),
});

// Product validation response
export const ProductValidationResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ProductSchema.optional(),
  warnings: z.array(z.string()).optional(),
});

// Bulk registration schemas (enhanced with better error handling)
export const BulkRegistrationRequestSchema = z.object({
  products: z.array(ProductRegistrationRequestSchema).min(1).max(100),
  validateOnly: z.boolean().default(false), // Dry run option
});

export const BulkRegistrationResultSchema = z.object({
  index: z.number().int(), // Position in input array
  product: ProductSchema.optional(),
  status: z.enum(['success', 'error', 'warning']),
  error: z.string().optional(),
  warnings: z.array(z.string()).optional(),
});

export const BulkRegistrationResponseSchema = z.object({
  success: z.boolean(),
  results: z.array(BulkRegistrationResultSchema),
  summary: z.object({
    total: z.number().int(),
    successful: z.number().int(),
    failed: z.number().int(),
    warnings: z.number().int(),
  }),
  validationOnly: z.boolean().optional(),
});

// Enhanced API Error schemas
export const ApiErrorDetailSchema = z.object({
  field: z.string(),
  message: z.string(),
  value: z.any().optional(),
  code: z.string().optional(), // Error code for programmatic handling
});

export const ApiErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.array(ApiErrorDetailSchema).optional(),
    timestamp: z.string().datetime().optional(),
    requestId: z.string().optional(),
  }),
});

export const ApiSuccessSchema = z.object({
  success: z.literal(true),
  data: z.any().optional(),
  message: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

// =============================================================================
// EXPORT TYPES
// =============================================================================

export type ProductSchemaType = z.infer<typeof ProductSchema>;
export type ProductRegistrationRequestSchemaType = z.infer<typeof ProductRegistrationRequestSchema>;
export type ProductUpdateRequestSchemaType = z.infer<typeof ProductUpdateRequestSchema>;
export type ProductQueryParamsSchemaType = z.infer<typeof ProductQueryParamsSchema>;
export type ProductsResponseSchemaType = z.infer<typeof ProductsResponseSchema>;
export type ProductValidationResponseSchemaType = z.infer<typeof ProductValidationResponseSchema>;
export type BulkRegistrationRequestSchemaType = z.infer<typeof BulkRegistrationRequestSchema>;
export type BulkRegistrationResponseSchemaType = z.infer<typeof BulkRegistrationResponseSchema>;
export type MetalObjectSchemaType = z.infer<typeof MetalObjectSchema>;
export type ApiErrorSchemaType = z.infer<typeof ApiErrorSchema>;
export type ApiSuccessSchemaType = z.infer<typeof ApiSuccessSchema>;

// =============================================================================
// HELPER SCHEMAS FOR DATABASE OPERATIONS
// =============================================================================

// Schema for database row mapping (internal use)
export const ProductDatabaseRowSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  producttypeid: z.string().uuid(),
  producttype: z.string(), // From JOIN
  metalid: z.string().uuid(),
  metalname: z.string(),   // From JOIN  
  metalsymbol: z.string(), // From JOIN
  producerid: z.string().uuid(),
  producer: z.string(),    // From JOIN
  issuingcountryid: z.string().uuid().nullable(),
  countrycode: z.string().nullable(), // From JOIN
  weight: z.string(),      // Database returns as string
  weightunit: z.string(),
  purity: z.string(),      // Database returns as string
  price: z.string(),       // Database returns as string
  currency: z.string(),
  premiumpercentage: z.string().nullable(),
  year: z.number().nullable(),
  description: z.string().nullable(),
  certifiedprovenance: z.boolean(),
  imageurl: z.string(),
  imagefilename: z.string().nullable(),
  instock: z.boolean(),
  stockquantity: z.number().nullable(),
  minimumorderquantity: z.number(),
  diameter: z.string().nullable(),
  thickness: z.string().nullable(),
  mintage: z.number().nullable(),
  certification: z.string().nullable(),
  createdat: z.string(),   // Database returns as string
  updatedat: z.string(),   // Database returns as string
});

export type ProductDatabaseRowSchemaType = z.infer<typeof ProductDatabaseRowSchema>;
