/**
 * GoldSphere Shared Library
 * 
 * Pure TypeScript library with shared types, Zod schemas, and OpenAPI contracts
 * for the GoldSphere precious metals platform.
 */

// Core Types (Common types exported first to avoid conflicts)
export * from './types/common';
export * from './types/products';
export * from './types/portfolio';
export * from './types/trading';
export * from './types/ui';

// Payment types - Export only config and provider interfaces to avoid conflicts with Zod types
export { 
  PaymentProviderImplementation,
  StripeConfig,
  MockConfig,
  ProviderConfig,
  PaymentConfig,
  PaymentPaginationParams,
  PaymentPaginatedResponse
} from './types/payment';

// Validation Schemas (Zod) - Explicit exports to avoid conflicts
export * from './validation/product-schemas';
export * from './validation/portfolio-schemas';
export { 
  // Schemas
  PaymentMethodTypeSchema,
  PaymentIntentStatusSchema,
  PaymentErrorTypeSchema,
  PaymentMethodSchema,
  PaymentIntentSchema,
  PaymentErrorSchema,
  CreatePaymentIntentRequestSchema,
  ConfirmPaymentRequestSchema,
  ListPaymentMethodsRequestSchema,
  RefundRequestSchema,
  CreatePaymentIntentResponseSchema,
  ConfirmPaymentResponseSchema,
  ListPaymentMethodsResponseSchema,
  RefundResponseSchema,
  RetrievePaymentIntentResponseSchema,
  PaymentWebhookEventSchema,
  PaginationParamsSchema,
  PaginatedResponseSchema,
  PaymentSchemas,
  // Legacy schema name aliases for backward compatibility
  PaymentIntentCreateSchema,
  PaymentIntentConfirmSchema,
  // Validation helpers
  validateCreatePaymentIntent,
  validateConfirmPayment,
  validateListPaymentMethods,
  validateRefundRequest,
  validateWebhookEvent,
  // Zod inferred types (with "Type" suffix to avoid conflicts with interfaces)
  type CreatePaymentIntentRequestType,
  type ConfirmPaymentRequestType,
  type ListPaymentMethodsRequestType,
  type RefundRequestType,
  type CreatePaymentIntentResponseType,
  type ConfirmPaymentResponseType,
  type ListPaymentMethodsResponseType,
  type RefundResponseType,
  type RetrievePaymentIntentResponseType,
  type PaymentWebhookEventType,
  // Server-expected Zod inferred types (without "Type" suffix)
  type PaymentError,
  type PaymentMethod,
  type PaymentIntent,
  type CreatePaymentIntentRequest,
  type ConfirmPaymentRequest,
  type ListPaymentMethodsRequest,
  type RefundRequest,
  type CreatePaymentIntentResponse,
  type ConfirmPaymentResponse,
  type ListPaymentMethodsResponse,
  type RefundResponse,
  type RetrievePaymentIntentResponse,
  type PaymentWebhookEvent
} from './validation/payment-schemas';

// API Contracts & Handlers
export * from './contracts/product-api';
export * from './contracts/portfolio-api';
export * from './contracts/payment-api';

// Explicit PaymentService export 
export { PaymentService } from './contracts/payment-api';

// Config (explicitly export to avoid conflicts)
export { 
  DEFAULT_PAYMENT_CONFIG,
  ENV_VAR_MAPPINGS
} from './config/payment-config';

// Utility Re-exports
export { z } from 'zod';

// Package Metadata
export const GOLDSPHERE_SHARED_VERSION = '1.0.5';
