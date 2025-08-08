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
export * from './types/payment';
export * from './types/ui';

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
  type PaymentWebhookEventType
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
export const GOLDSPHERE_SHARED_VERSION = '1.0.3';
