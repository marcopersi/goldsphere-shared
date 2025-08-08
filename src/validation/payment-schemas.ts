import { z } from 'zod';
import { CurrencySchema } from './currency-schemas';

// Enums and Constants
export const PaymentMethodTypeSchema = z.enum(['card', 'bank_transfer', 'sepa_debit']);
export const PaymentIntentStatusSchema = z.enum([
  'requires_payment_method',
  'requires_confirmation', 
  'requires_action',
  'processing',
  'succeeded',
  'canceled',
  'requires_capture'
]);
export const PaymentErrorTypeSchema = z.enum(['card_error', 'validation_error', 'api_error', 'authentication_error']);

// Core Entity Schemas
export const PaymentMethodSchema = z.object({
  id: z.string().min(1, 'Payment method ID is required'),
  type: PaymentMethodTypeSchema,
  isDefault: z.boolean().optional(),
  // Card specific
  last4: z.string().length(4).optional(),
  brand: z.string().optional(),
  expiryMonth: z.number().min(1).max(12).optional(),
  expiryYear: z.number().min(new Date().getFullYear()).optional(),
  // Bank specific
  bankName: z.string().optional(),
  accountLast4: z.string().length(4).optional(),
  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
}).refine(
  (data) => {
    if (data.type === 'card') {
      return data.last4 && data.brand && data.expiryMonth && data.expiryYear;
    }
    if (data.type === 'bank_transfer' || data.type === 'sepa_debit') {
      return data.bankName && data.accountLast4;
    }
    return true;
  },
  {
    message: 'Invalid payment method data for the specified type',
    path: ['type']
  }
);

export const PaymentIntentSchema = z.object({
  id: z.string().min(1, 'Payment intent ID is required'),
  clientSecret: z.string().min(1, 'Client secret is required'),
  amount: z.number().int().positive('Amount must be positive'),
  currency: CurrencySchema,
  status: PaymentIntentStatusSchema,
  orderId: z.string().optional(),
  customerId: z.string().optional(),
  paymentMethodId: z.string().optional(),
  metadata: z.record(z.string()).optional(),
  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  // Payment details
  amountReceived: z.number().int().nonnegative().optional(),
  fees: z.number().int().nonnegative().optional(),
  refunded: z.boolean().optional(),
  refundedAmount: z.number().int().nonnegative().optional()
});

export const PaymentErrorSchema = z.object({
  code: z.string().min(1, 'Error code is required'),
  message: z.string().min(1, 'Error message is required'),
  type: PaymentErrorTypeSchema,
  param: z.string().optional(),
  declineCode: z.string().optional()
});

// Request Schemas
export const CreatePaymentIntentRequestSchema = z.object({
  amount: z.number().int().positive('Amount must be positive'),
  currency: CurrencySchema,
  orderId: z.string().min(1, 'Order ID is required'),
  customerId: z.string().optional(),
  paymentMethodId: z.string().optional(),
  automaticPaymentMethods: z.object({
    enabled: z.boolean(),
    allowRedirects: z.enum(['always', 'never']).optional()
  }).optional(),
  description: z.string().max(1000).optional(),
  metadata: z.record(z.string()).optional()
});

export const ConfirmPaymentRequestSchema = z.object({
  paymentIntentId: z.string().min(1, 'Payment intent ID is required'),
  paymentMethodId: z.string().optional(),
  returnUrl: z.string().url().optional(),
  useStripeSdk: z.boolean().optional()
});

export const ListPaymentMethodsRequestSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  type: PaymentMethodTypeSchema.optional(),
  limit: z.number().int().min(1).max(100).default(10)
});

export const RefundRequestSchema = z.object({
  paymentIntentId: z.string().min(1, 'Payment intent ID is required'),
  amount: z.number().int().positive().optional(),
  reason: z.enum(['duplicate', 'fraudulent', 'requested_by_customer']).optional(),
  metadata: z.record(z.string()).optional()
});

// Response Schemas
export const CreatePaymentIntentResponseSchema = z.object({
  success: z.boolean(),
  paymentIntent: PaymentIntentSchema.optional(),
  error: PaymentErrorSchema.optional()
}).refine(
  (data) => data.success ? !!data.paymentIntent : !!data.error,
  {
    message: 'Response must include paymentIntent on success or error on failure',
    path: ['success']
  }
);

export const ConfirmPaymentResponseSchema = z.object({
  success: z.boolean(),
  paymentIntent: PaymentIntentSchema.optional(),
  error: PaymentErrorSchema.optional(),
  requiresAction: z.boolean().optional(),
  nextAction: z.object({
    type: z.string(),
    redirectToUrl: z.string().url().optional()
  }).optional()
});

export const ListPaymentMethodsResponseSchema = z.object({
  success: z.boolean(),
  paymentMethods: z.array(PaymentMethodSchema).optional(),
  hasMore: z.boolean().optional(),
  error: PaymentErrorSchema.optional()
});

export const RefundResponseSchema = z.object({
  success: z.boolean(),
  refund: z.object({
    id: z.string(),
    amount: z.number().int().nonnegative(),
    currency: CurrencySchema,
    status: z.enum(['pending', 'succeeded', 'failed', 'canceled']),
    reason: z.string().optional(),
    createdAt: z.string().datetime()
  }).optional(),
  error: PaymentErrorSchema.optional()
});

export const RetrievePaymentIntentResponseSchema = z.object({
  success: z.boolean(),
  paymentIntent: PaymentIntentSchema.optional(),
  error: PaymentErrorSchema.optional()
}).refine(
  (data) => data.success ? !!data.paymentIntent : !!data.error,
  {
    message: 'Response must include paymentIntent on success or error on failure',
    path: ['success']
  }
);

// Webhook Event Schema
export const PaymentWebhookEventSchema = z.object({
  id: z.string().min(1, 'Event ID is required'),
  type: z.enum(['payment_intent.succeeded', 'payment_intent.payment_failed', 'payment_intent.canceled', 'payment_method.attached']),
  data: z.object({
    object: z.union([PaymentIntentSchema, PaymentMethodSchema])
  }),
  createdAt: z.string().datetime(),
  livemode: z.boolean()
});

// Pagination Schema
export const PaginationParamsSchema = z.object({
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).default(20),
  startingAfter: z.string().optional(),
  endingBefore: z.string().optional()
});

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    hasMore: z.boolean(),
    totalCount: z.number().int().nonnegative().optional(),
    nextPage: z.string().optional(),
    previousPage: z.string().optional()
  });

// Validation Helper Functions
export const validateCreatePaymentIntent = (data: unknown) => {
  return CreatePaymentIntentRequestSchema.safeParse(data);
};

export const validateConfirmPayment = (data: unknown) => {
  return ConfirmPaymentRequestSchema.safeParse(data);
};

export const validateListPaymentMethods = (data: unknown) => {
  return ListPaymentMethodsRequestSchema.safeParse(data);
};

export const validateRefundRequest = (data: unknown) => {
  return RefundRequestSchema.safeParse(data);
};

export const validateWebhookEvent = (data: unknown) => {
  return PaymentWebhookEventSchema.safeParse(data);
};

// Legacy schema name aliases for backward compatibility
export const PaymentIntentCreateSchema = CreatePaymentIntentRequestSchema;
export const PaymentIntentConfirmSchema = ConfirmPaymentRequestSchema;

// Export all schemas for use in API validation
export const PaymentSchemas = {
  // Entities
  PaymentMethod: PaymentMethodSchema,
  PaymentIntent: PaymentIntentSchema,
  PaymentError: PaymentErrorSchema,
  
  // Requests
  CreatePaymentIntentRequest: CreatePaymentIntentRequestSchema,
  ConfirmPaymentRequest: ConfirmPaymentRequestSchema,
  ListPaymentMethodsRequest: ListPaymentMethodsRequestSchema,
  RefundRequest: RefundRequestSchema,
  
  // Legacy aliases
  PaymentIntentCreateSchema: CreatePaymentIntentRequestSchema,
  PaymentIntentConfirmSchema: ConfirmPaymentRequestSchema,
  
  // Responses
  CreatePaymentIntentResponse: CreatePaymentIntentResponseSchema,
  ConfirmPaymentResponse: ConfirmPaymentResponseSchema,
  ListPaymentMethodsResponse: ListPaymentMethodsResponseSchema,
  RefundResponse: RefundResponseSchema,
  RetrievePaymentIntentResponse: RetrievePaymentIntentResponseSchema,
  
  // Events
  PaymentWebhookEvent: PaymentWebhookEventSchema,
  
  // Pagination
  PaginationParams: PaginationParamsSchema,
  PaginatedResponse: PaginatedResponseSchema
};

// Type inference helpers - Export all TypeScript types
export type PaymentMethodInput = z.infer<typeof PaymentMethodSchema>;
export type PaymentIntentInput = z.infer<typeof PaymentIntentSchema>;
export type PaymentErrorType = z.infer<typeof PaymentErrorSchema>;

// Server-expected type names (without "Type" suffix)
export type PaymentError = z.infer<typeof PaymentErrorSchema>;
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
export type PaymentIntent = z.infer<typeof PaymentIntentSchema>;

// Request types
export type CreatePaymentIntentRequestType = z.infer<typeof CreatePaymentIntentRequestSchema>;
export type ConfirmPaymentRequestType = z.infer<typeof ConfirmPaymentRequestSchema>;
export type ListPaymentMethodsRequestType = z.infer<typeof ListPaymentMethodsRequestSchema>;
export type RefundRequestType = z.infer<typeof RefundRequestSchema>;

// Server-expected request type names (without "Type" suffix)
export type CreatePaymentIntentRequest = z.infer<typeof CreatePaymentIntentRequestSchema>;
export type ConfirmPaymentRequest = z.infer<typeof ConfirmPaymentRequestSchema>;
export type ListPaymentMethodsRequest = z.infer<typeof ListPaymentMethodsRequestSchema>;
export type RefundRequest = z.infer<typeof RefundRequestSchema>;

// Response types  
export type CreatePaymentIntentResponseType = z.infer<typeof CreatePaymentIntentResponseSchema>;
export type ConfirmPaymentResponseType = z.infer<typeof ConfirmPaymentResponseSchema>;
export type ListPaymentMethodsResponseType = z.infer<typeof ListPaymentMethodsResponseSchema>;
export type RefundResponseType = z.infer<typeof RefundResponseSchema>;
export type RetrievePaymentIntentResponseType = z.infer<typeof RetrievePaymentIntentResponseSchema>;

// Server-expected response type names (without "Type" suffix)
export type CreatePaymentIntentResponse = z.infer<typeof CreatePaymentIntentResponseSchema>;
export type ConfirmPaymentResponse = z.infer<typeof ConfirmPaymentResponseSchema>;
export type ListPaymentMethodsResponse = z.infer<typeof ListPaymentMethodsResponseSchema>;
export type RefundResponse = z.infer<typeof RefundResponseSchema>;
export type RetrievePaymentIntentResponse = z.infer<typeof RetrievePaymentIntentResponseSchema>;

// Additional types
export type PaymentWebhookEventType = z.infer<typeof PaymentWebhookEventSchema>;
export type PaymentWebhookEvent = z.infer<typeof PaymentWebhookEventSchema>;
