"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSuccessSchema = exports.ApiErrorSchema = exports.ApiErrorDetailSchema = exports.BulkRegistrationResponseSchema = exports.BulkRegistrationResultSchema = exports.BulkRegistrationRequestSchema = exports.ProductsResponseSchema = exports.PaginationSchema = exports.ProductQueryParamsSchema = exports.ProductUpdateRequestSchema = exports.ProductRegistrationRequestSchema = exports.ProductSchema = exports.SpecificationsSchema = exports.WeightUnitSchema = exports.MetalTypeSchema = exports.ProductTypeSchema = void 0;
const zod_1 = require("zod");
const currency_schemas_1 = require("./currency-schemas");
// Enum schemas
exports.ProductTypeSchema = zod_1.z.enum(['coin', 'bar', 'round']);
exports.MetalTypeSchema = zod_1.z.enum(['gold', 'silver', 'platinum', 'palladium']);
exports.WeightUnitSchema = zod_1.z.enum(['grams', 'troy_ounces', 'kilograms']);
// Specifications schema (flexible object)
exports.SpecificationsSchema = zod_1.z.object({
    diameter: zod_1.z.number().optional(),
    thickness: zod_1.z.number().optional(),
    mintage: zod_1.z.number().int().optional(),
    certification: zod_1.z.string().optional(),
}).passthrough(); // Allow additional properties
// Core Product schema
exports.ProductSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1).max(200),
    type: exports.ProductTypeSchema,
    metal: exports.MetalTypeSchema,
    weight: zod_1.z.number().positive(),
    weightUnit: exports.WeightUnitSchema,
    purity: zod_1.z.number().min(0.001).max(1),
    price: zod_1.z.number().positive(),
    currency: currency_schemas_1.CurrencySchema,
    producer: zod_1.z.string().min(1).max(100),
    country: zod_1.z.string().max(100).optional(),
    year: zod_1.z.number().int().min(1800).max(2100).optional(),
    description: zod_1.z.string().max(2000).optional(),
    specifications: exports.SpecificationsSchema.optional(),
    imageUrl: zod_1.z.string().url(),
    inStock: zod_1.z.boolean(),
    stockQuantity: zod_1.z.number().int().min(0).optional(),
    minimumOrderQuantity: zod_1.z.number().int().min(1),
    premiumPercentage: zod_1.z.number().min(0).optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
});
// Product Registration schema
exports.ProductRegistrationRequestSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200),
    type: exports.ProductTypeSchema,
    metal: exports.MetalTypeSchema,
    weight: zod_1.z.number().min(0.001),
    weightUnit: exports.WeightUnitSchema,
    purity: zod_1.z.number().min(0.001).max(1),
    price: zod_1.z.number().min(0.01),
    currency: currency_schemas_1.CurrencySchema,
    producer: zod_1.z.string().min(1).max(100),
    country: zod_1.z.string().max(100).optional(),
    year: zod_1.z.number().int().min(1800).max(2100).optional(),
    description: zod_1.z.string().max(2000).optional(),
    specifications: exports.SpecificationsSchema.optional(),
    inStock: zod_1.z.boolean().default(true),
    stockQuantity: zod_1.z.number().int().min(0).optional(),
    minimumOrderQuantity: zod_1.z.number().int().min(1).default(1),
    premiumPercentage: zod_1.z.number().min(0).optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
// Product Update schema (all fields optional except validation rules)
exports.ProductUpdateRequestSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200).optional(),
    price: zod_1.z.number().min(0.01).optional(),
    description: zod_1.z.string().max(2000).optional(),
    specifications: exports.SpecificationsSchema.optional(),
    inStock: zod_1.z.boolean().optional(),
    stockQuantity: zod_1.z.number().int().min(0).optional(),
    minimumOrderQuantity: zod_1.z.number().int().min(1).optional(),
    premiumPercentage: zod_1.z.number().min(0).optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
// Query parameters schema
exports.ProductQueryParamsSchema = zod_1.z.object({
    page: zod_1.z.number().int().min(1).default(1).optional(),
    limit: zod_1.z.number().int().min(1).max(100).default(20).optional(),
    metal: exports.MetalTypeSchema.optional(),
    type: exports.ProductTypeSchema.optional(),
    producer: zod_1.z.string().optional(),
});
// Pagination schema
exports.PaginationSchema = zod_1.z.object({
    page: zod_1.z.number().int(),
    limit: zod_1.z.number().int(),
    total: zod_1.z.number().int(),
    totalPages: zod_1.z.number().int(),
    hasNext: zod_1.z.boolean(),
    hasPrev: zod_1.z.boolean(),
});
// Products response schema
exports.ProductsResponseSchema = zod_1.z.object({
    products: zod_1.z.array(exports.ProductSchema),
    pagination: exports.PaginationSchema,
});
// Bulk registration schemas
exports.BulkRegistrationRequestSchema = zod_1.z.object({
    products: zod_1.z.array(exports.ProductRegistrationRequestSchema).min(1).max(100),
});
exports.BulkRegistrationResultSchema = zod_1.z.object({
    product: exports.ProductSchema.optional(),
    status: zod_1.z.enum(['success', 'error']),
    error: zod_1.z.string().optional(),
});
exports.BulkRegistrationResponseSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    results: zod_1.z.array(exports.BulkRegistrationResultSchema),
    summary: zod_1.z.object({
        total: zod_1.z.number().int(),
        successful: zod_1.z.number().int(),
        failed: zod_1.z.number().int(),
    }),
});
// API Error schemas
exports.ApiErrorDetailSchema = zod_1.z.object({
    field: zod_1.z.string(),
    message: zod_1.z.string(),
});
exports.ApiErrorSchema = zod_1.z.object({
    success: zod_1.z.literal(false),
    error: zod_1.z.object({
        code: zod_1.z.string(),
        message: zod_1.z.string(),
        details: zod_1.z.array(exports.ApiErrorDetailSchema).optional(),
    }),
});
exports.ApiSuccessSchema = zod_1.z.object({
    success: zod_1.z.literal(true),
    data: zod_1.z.any().optional(),
    message: zod_1.z.string().optional(),
});
//# sourceMappingURL=product-schemas.js.map