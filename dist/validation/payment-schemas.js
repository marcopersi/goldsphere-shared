"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSchemas = exports.validateWebhookEvent = exports.validateRefundRequest = exports.validateListPaymentMethods = exports.validateConfirmPayment = exports.validateCreatePaymentIntent = exports.PaginatedResponseSchema = exports.PaginationParamsSchema = exports.PaymentWebhookEventSchema = exports.RefundResponseSchema = exports.ListPaymentMethodsResponseSchema = exports.ConfirmPaymentResponseSchema = exports.CreatePaymentIntentResponseSchema = exports.RefundRequestSchema = exports.ListPaymentMethodsRequestSchema = exports.ConfirmPaymentRequestSchema = exports.CreatePaymentIntentRequestSchema = exports.PaymentErrorSchema = exports.PaymentIntentSchema = exports.PaymentMethodSchema = exports.PaymentErrorTypeSchema = exports.PaymentIntentStatusSchema = exports.PaymentMethodTypeSchema = void 0;
const zod_1 = require("zod");
const currency_schemas_1 = require("./currency-schemas");
// Enums and Constants
exports.PaymentMethodTypeSchema = zod_1.z.enum(['card', 'bank_transfer', 'sepa_debit']);
exports.PaymentIntentStatusSchema = zod_1.z.enum([
    'requires_payment_method',
    'requires_confirmation',
    'requires_action',
    'processing',
    'succeeded',
    'canceled',
    'requires_capture'
]);
exports.PaymentErrorTypeSchema = zod_1.z.enum(['card_error', 'validation_error', 'api_error', 'authentication_error']);
// Core Entity Schemas
exports.PaymentMethodSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'Payment method ID is required'),
    type: exports.PaymentMethodTypeSchema,
    isDefault: zod_1.z.boolean().optional(),
    // Card specific
    last4: zod_1.z.string().length(4).optional(),
    brand: zod_1.z.string().optional(),
    expiryMonth: zod_1.z.number().min(1).max(12).optional(),
    expiryYear: zod_1.z.number().min(new Date().getFullYear()).optional(),
    // Bank specific
    bankName: zod_1.z.string().optional(),
    accountLast4: zod_1.z.string().length(4).optional(),
    // Timestamps
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime()
}).refine((data) => {
    if (data.type === 'card') {
        return data.last4 && data.brand && data.expiryMonth && data.expiryYear;
    }
    if (data.type === 'bank_transfer' || data.type === 'sepa_debit') {
        return data.bankName && data.accountLast4;
    }
    return true;
}, {
    message: 'Invalid payment method data for the specified type',
    path: ['type']
});
exports.PaymentIntentSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'Payment intent ID is required'),
    clientSecret: zod_1.z.string().min(1, 'Client secret is required'),
    amount: zod_1.z.number().int().positive('Amount must be positive'),
    currency: currency_schemas_1.CurrencySchema,
    status: exports.PaymentIntentStatusSchema,
    orderId: zod_1.z.string().optional(),
    customerId: zod_1.z.string().optional(),
    paymentMethodId: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.string()).optional(),
    // Timestamps
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
    // Payment details
    amountReceived: zod_1.z.number().int().nonnegative().optional(),
    fees: zod_1.z.number().int().nonnegative().optional(),
    refunded: zod_1.z.boolean().optional(),
    refundedAmount: zod_1.z.number().int().nonnegative().optional()
});
exports.PaymentErrorSchema = zod_1.z.object({
    code: zod_1.z.string().min(1, 'Error code is required'),
    message: zod_1.z.string().min(1, 'Error message is required'),
    type: exports.PaymentErrorTypeSchema,
    param: zod_1.z.string().optional(),
    declineCode: zod_1.z.string().optional()
});
// Request Schemas
exports.CreatePaymentIntentRequestSchema = zod_1.z.object({
    amount: zod_1.z.number().int().positive('Amount must be positive'),
    currency: currency_schemas_1.CurrencySchema,
    orderId: zod_1.z.string().min(1, 'Order ID is required'),
    customerId: zod_1.z.string().optional(),
    paymentMethodId: zod_1.z.string().optional(),
    automaticPaymentMethods: zod_1.z.object({
        enabled: zod_1.z.boolean(),
        allowRedirects: zod_1.z.enum(['always', 'never']).optional()
    }).optional(),
    description: zod_1.z.string().max(1000).optional(),
    metadata: zod_1.z.record(zod_1.z.string()).optional()
});
exports.ConfirmPaymentRequestSchema = zod_1.z.object({
    paymentIntentId: zod_1.z.string().min(1, 'Payment intent ID is required'),
    paymentMethodId: zod_1.z.string().optional(),
    returnUrl: zod_1.z.string().url().optional(),
    useStripeSdk: zod_1.z.boolean().optional()
});
exports.ListPaymentMethodsRequestSchema = zod_1.z.object({
    customerId: zod_1.z.string().min(1, 'Customer ID is required'),
    type: exports.PaymentMethodTypeSchema.optional(),
    limit: zod_1.z.number().int().min(1).max(100).default(10)
});
exports.RefundRequestSchema = zod_1.z.object({
    paymentIntentId: zod_1.z.string().min(1, 'Payment intent ID is required'),
    amount: zod_1.z.number().int().positive().optional(),
    reason: zod_1.z.enum(['duplicate', 'fraudulent', 'requested_by_customer']).optional(),
    metadata: zod_1.z.record(zod_1.z.string()).optional()
});
// Response Schemas
exports.CreatePaymentIntentResponseSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    paymentIntent: exports.PaymentIntentSchema.optional(),
    error: exports.PaymentErrorSchema.optional()
}).refine((data) => data.success ? !!data.paymentIntent : !!data.error, {
    message: 'Response must include paymentIntent on success or error on failure',
    path: ['success']
});
exports.ConfirmPaymentResponseSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    paymentIntent: exports.PaymentIntentSchema.optional(),
    error: exports.PaymentErrorSchema.optional(),
    requiresAction: zod_1.z.boolean().optional(),
    nextAction: zod_1.z.object({
        type: zod_1.z.string(),
        redirectToUrl: zod_1.z.string().url().optional()
    }).optional()
});
exports.ListPaymentMethodsResponseSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    paymentMethods: zod_1.z.array(exports.PaymentMethodSchema).optional(),
    hasMore: zod_1.z.boolean().optional(),
    error: exports.PaymentErrorSchema.optional()
});
exports.RefundResponseSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    refund: zod_1.z.object({
        id: zod_1.z.string(),
        amount: zod_1.z.number().int().nonnegative(),
        currency: currency_schemas_1.CurrencySchema,
        status: zod_1.z.enum(['pending', 'succeeded', 'failed', 'canceled']),
        reason: zod_1.z.string().optional(),
        createdAt: zod_1.z.string().datetime()
    }).optional(),
    error: exports.PaymentErrorSchema.optional()
});
// Webhook Event Schema
exports.PaymentWebhookEventSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'Event ID is required'),
    type: zod_1.z.enum(['payment_intent.succeeded', 'payment_intent.payment_failed', 'payment_intent.canceled', 'payment_method.attached']),
    data: zod_1.z.object({
        object: zod_1.z.union([exports.PaymentIntentSchema, exports.PaymentMethodSchema])
    }),
    createdAt: zod_1.z.string().datetime(),
    livemode: zod_1.z.boolean()
});
// Pagination Schema
exports.PaginationParamsSchema = zod_1.z.object({
    page: zod_1.z.number().int().min(1).optional(),
    limit: zod_1.z.number().int().min(1).max(100).default(20),
    startingAfter: zod_1.z.string().optional(),
    endingBefore: zod_1.z.string().optional()
});
const PaginatedResponseSchema = (itemSchema) => zod_1.z.object({
    data: zod_1.z.array(itemSchema),
    hasMore: zod_1.z.boolean(),
    totalCount: zod_1.z.number().int().nonnegative().optional(),
    nextPage: zod_1.z.string().optional(),
    previousPage: zod_1.z.string().optional()
});
exports.PaginatedResponseSchema = PaginatedResponseSchema;
// Validation Helper Functions
const validateCreatePaymentIntent = (data) => {
    return exports.CreatePaymentIntentRequestSchema.safeParse(data);
};
exports.validateCreatePaymentIntent = validateCreatePaymentIntent;
const validateConfirmPayment = (data) => {
    return exports.ConfirmPaymentRequestSchema.safeParse(data);
};
exports.validateConfirmPayment = validateConfirmPayment;
const validateListPaymentMethods = (data) => {
    return exports.ListPaymentMethodsRequestSchema.safeParse(data);
};
exports.validateListPaymentMethods = validateListPaymentMethods;
const validateRefundRequest = (data) => {
    return exports.RefundRequestSchema.safeParse(data);
};
exports.validateRefundRequest = validateRefundRequest;
const validateWebhookEvent = (data) => {
    return exports.PaymentWebhookEventSchema.safeParse(data);
};
exports.validateWebhookEvent = validateWebhookEvent;
// Export all schemas for use in API validation
exports.PaymentSchemas = {
    // Entities
    PaymentMethod: exports.PaymentMethodSchema,
    PaymentIntent: exports.PaymentIntentSchema,
    PaymentError: exports.PaymentErrorSchema,
    // Requests
    CreatePaymentIntentRequest: exports.CreatePaymentIntentRequestSchema,
    ConfirmPaymentRequest: exports.ConfirmPaymentRequestSchema,
    ListPaymentMethodsRequest: exports.ListPaymentMethodsRequestSchema,
    RefundRequest: exports.RefundRequestSchema,
    // Responses
    CreatePaymentIntentResponse: exports.CreatePaymentIntentResponseSchema,
    ConfirmPaymentResponse: exports.ConfirmPaymentResponseSchema,
    ListPaymentMethodsResponse: exports.ListPaymentMethodsResponseSchema,
    RefundResponse: exports.RefundResponseSchema,
    // Events
    PaymentWebhookEvent: exports.PaymentWebhookEventSchema,
    // Pagination
    PaginationParams: exports.PaginationParamsSchema,
    PaginatedResponse: exports.PaginatedResponseSchema
};
//# sourceMappingURL=payment-schemas.js.map