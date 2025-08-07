"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsResponseSchema = exports.PositionsResponseSchema = exports.TransactionQueryParamsSchema = exports.PositionQueryParamsSchema = exports.PortfolioSummarySchema = exports.MetalBreakdownSchema = exports.TransactionHistoryItemSchema = exports.TransactionCreateRequestSchema = exports.TransactionSchema = exports.PositionUpdateRequestSchema = exports.PositionCreateRequestSchema = exports.PositionSchema = exports.TransactionTypeSchema = exports.PositionStatusSchema = void 0;
const zod_1 = require("zod");
// Enum schemas
exports.PositionStatusSchema = zod_1.z.enum(['active', 'closed']);
exports.TransactionTypeSchema = zod_1.z.enum(['buy', 'sell']);
// Core Position schema
exports.PositionSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    userId: zod_1.z.string().min(1),
    productId: zod_1.z.string().min(1),
    purchaseDate: zod_1.z.string().datetime(),
    purchasePrice: zod_1.z.number().positive(),
    marketPrice: zod_1.z.number().positive(),
    quantity: zod_1.z.number().positive(),
    issuingCountry: zod_1.z.string().min(1).max(100),
    producer: zod_1.z.string().min(1).max(100),
    certifiedProvenance: zod_1.z.boolean(),
    status: exports.PositionStatusSchema,
    closedDate: zod_1.z.string().datetime().optional(),
    notes: zod_1.z.string().max(1000).optional(),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
});
// Position creation schema
exports.PositionCreateRequestSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1),
    purchaseDate: zod_1.z.string().datetime(),
    purchasePrice: zod_1.z.number().min(0.01),
    quantity: zod_1.z.number().min(0.001),
    issuingCountry: zod_1.z.string().min(1).max(100),
    producer: zod_1.z.string().min(1).max(100),
    certifiedProvenance: zod_1.z.boolean(),
    notes: zod_1.z.string().max(1000).optional(),
});
// Position update schema
exports.PositionUpdateRequestSchema = zod_1.z.object({
    marketPrice: zod_1.z.number().min(0.01).optional(),
    quantity: zod_1.z.number().min(0.001).optional(),
    notes: zod_1.z.string().max(1000).optional(),
    status: exports.PositionStatusSchema.optional(),
});
// Transaction schema
exports.TransactionSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    positionId: zod_1.z.string().min(1),
    userId: zod_1.z.string().min(1),
    type: exports.TransactionTypeSchema,
    date: zod_1.z.string().datetime(),
    quantity: zod_1.z.number().min(0.001),
    price: zod_1.z.number().min(0.01),
    fees: zod_1.z.number().min(0).default(0),
    notes: zod_1.z.string().max(500).optional(),
    createdAt: zod_1.z.string().datetime(),
});
// Transaction creation schema
exports.TransactionCreateRequestSchema = zod_1.z.object({
    positionId: zod_1.z.string().min(1),
    type: exports.TransactionTypeSchema,
    date: zod_1.z.string().datetime(),
    quantity: zod_1.z.number().min(0.001),
    price: zod_1.z.number().min(0.01),
    fees: zod_1.z.number().min(0).default(0),
    notes: zod_1.z.string().max(500).optional(),
});
// Transaction history item schema
exports.TransactionHistoryItemSchema = exports.TransactionSchema.extend({
    productName: zod_1.z.string(),
    total: zod_1.z.number(),
});
// Portfolio summary schemas
exports.MetalBreakdownSchema = zod_1.z.object({
    value: zod_1.z.number(),
    percentage: zod_1.z.number(),
    weight: zod_1.z.number(),
    positionCount: zod_1.z.number().int(),
});
exports.PortfolioSummarySchema = zod_1.z.object({
    totalValue: zod_1.z.number(),
    totalCost: zod_1.z.number(),
    totalGainLoss: zod_1.z.number(),
    totalGainLossPercentage: zod_1.z.number(),
    positionCount: zod_1.z.number().int(),
    metalBreakdown: zod_1.z.object({
        gold: exports.MetalBreakdownSchema.optional(),
        silver: exports.MetalBreakdownSchema.optional(),
        platinum: exports.MetalBreakdownSchema.optional(),
        palladium: exports.MetalBreakdownSchema.optional(),
    }),
    lastUpdated: zod_1.z.string().datetime(),
});
// Query parameters schemas
exports.PositionQueryParamsSchema = zod_1.z.object({
    page: zod_1.z.number().int().min(1).default(1).optional(),
    limit: zod_1.z.number().int().min(1).max(100).default(20).optional(),
    status: exports.PositionStatusSchema.optional(),
    metal: zod_1.z.enum(['gold', 'silver', 'platinum', 'palladium']).optional(),
    producer: zod_1.z.string().optional(),
});
exports.TransactionQueryParamsSchema = zod_1.z.object({
    page: zod_1.z.number().int().min(1).default(1).optional(),
    limit: zod_1.z.number().int().min(1).max(100).default(20).optional(),
    type: exports.TransactionTypeSchema.optional(),
    positionId: zod_1.z.string().optional(),
    startDate: zod_1.z.string().date().optional(),
    endDate: zod_1.z.string().date().optional(),
});
// Response schemas
exports.PositionsResponseSchema = zod_1.z.object({
    positions: zod_1.z.array(exports.PositionSchema),
    pagination: zod_1.z.object({
        page: zod_1.z.number().int(),
        limit: zod_1.z.number().int(),
        total: zod_1.z.number().int(),
        totalPages: zod_1.z.number().int(),
        hasNext: zod_1.z.boolean(),
        hasPrev: zod_1.z.boolean(),
    }),
});
exports.TransactionsResponseSchema = zod_1.z.object({
    transactions: zod_1.z.array(exports.TransactionHistoryItemSchema),
    pagination: zod_1.z.object({
        page: zod_1.z.number().int(),
        limit: zod_1.z.number().int(),
        total: zod_1.z.number().int(),
        totalPages: zod_1.z.number().int(),
        hasNext: zod_1.z.boolean(),
        hasPrev: zod_1.z.boolean(),
    }),
});
//# sourceMappingURL=portfolio-schemas.js.map