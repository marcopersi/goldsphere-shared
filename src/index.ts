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

// Explicit type exports for server requirements
export { 
  PaymentError,
  CreatePaymentIntentRequest, 
  ConfirmPaymentRequest,
  RetrievePaymentIntentResponse,
  ListPaymentMethodsResponse,
  RefundRequest,
  RefundResponse,
  PaymentWebhookEvent,
  PaymentMethod,
  PaymentIntent
} from './types/payment';

// Validation Schemas (Zod)
export * from './validation/product-schemas';
export * from './validation/portfolio-schemas';
export * from './validation/payment-schemas';

// Explicit exports for backward compatibility and server requirements
export { 
  PaymentIntentCreateSchema,
  PaymentIntentConfirmSchema,
  CreatePaymentIntentRequestSchema,
  ConfirmPaymentRequestSchema,
  PaymentErrorSchema,
  PaymentMethodSchema,
  PaymentIntentSchema
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
export const GOLDSPHERE_SHARED_VERSION = '1.0.0';
