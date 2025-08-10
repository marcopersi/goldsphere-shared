/**
 * GoldSphere Shared Library
 * 
 * Pure TypeScript library with shared types, Zod schemas, and OpenAPI contracts
 * for the GoldSphere precious metals platform.
 * 
 * COMPREHENSIVE EXPORTS - Everything you need for server, frontend, and any other project
 */

// =============================================================================
// API CONTRACTS - Export all API interfaces and implementations
// =============================================================================
export * from './contracts/product-api';
export * from './contracts/portfolio-api';
export * from './contracts/payment-api';
export * from './contracts/reference-data-api';

// =============================================================================
// CORE TYPES - Export everything from all type modules
// =============================================================================
export * from './types/common';
export * from './types/products';
export * from './types/portfolio';
export * from './types/trading';
export * from './types/ui';

// Payment types - Export only non-conflicting types
export { 
  PaymentProviderImplementation,
  StripeConfig,
  MockConfig,
  ProviderConfig,
  PaymentConfig,
  PaymentPaginationParams,
  PaymentPaginatedResponse
} from './types/payment';

// =============================================================================
// CLASS-BASED ENUMS - Export with explicit naming to avoid conflicts
// =============================================================================
export { Metal } from './enums/metal';
export { ProductType as ProductTypeEnum } from './enums/product-type';
export { Country as CountryEnum } from './enums/country';
export { Currency as CurrencyEnum } from './enums/currency';
export { Producer } from './enums/producer';
export { OrderType } from './enums/order-type';
export { OrderStatus } from './enums/order-status';

// =============================================================================
// VALIDATION SCHEMAS - Export everything from all validation modules
// =============================================================================
export * from './validation/product-schemas';
export * from './validation/portfolio-schemas';
export * from './validation/currency-schemas';

// Enum validation schemas - Export with explicit naming
export { 
  MetalEnumSchema,
  ProductTypeEnumSchema,
  CountryEnumSchema,
  CurrencyEnumSchema,
  ProducerEnumSchema,
  OrderTypeEnumSchema,
  OrderStatusEnumSchema
} from './validation/enum-schemas';

// Payment validation schemas - Export schemas AND explicitly export all Zod-inferred types
export {
  // Enum Schemas
  PaymentMethodTypeSchema,
  PaymentIntentStatusSchema,
  PaymentErrorTypeSchema,
  
  // Entity Schemas
  PaymentMethodSchema,
  PaymentIntentSchema,
  PaymentErrorSchema,
  
  // Request Schemas
  CreatePaymentIntentRequestSchema,
  ConfirmPaymentRequestSchema,
  ListPaymentMethodsRequestSchema,
  RefundRequestSchema,
  
  // Response Schemas
  CreatePaymentIntentResponseSchema,
  ConfirmPaymentResponseSchema,
  ListPaymentMethodsResponseSchema,
  RefundResponseSchema,
  RetrievePaymentIntentResponseSchema,
  
  // Event Schemas
  PaymentWebhookEventSchema,
  
  // Pagination Schemas
  PaginationParamsSchema,
  PaginatedResponseSchema,
  
  // Schema Collections
  PaymentSchemas,
  
  // Legacy aliases
  PaymentIntentCreateSchema,
  PaymentIntentConfirmSchema,
  
  // Validation helpers
  validateCreatePaymentIntent,
  validateConfirmPayment,
  validateListPaymentMethods,
  validateRefundRequest,
  validateWebhookEvent,
  
  // =============================================================================
  // EXPLICIT TYPE EXPORTS - All Zod-inferred types the server needs
  // =============================================================================
  
  // Entity Types (what server needs)
  type PaymentError,
  type PaymentMethod,
  type PaymentIntent,
  
  // Request Types (what server needs)
  type CreatePaymentIntentRequest,
  type ConfirmPaymentRequest,
  type ListPaymentMethodsRequest,
  type RefundRequest,
  
  // Response Types (what server needs)
  type CreatePaymentIntentResponse,
  type ConfirmPaymentResponse,
  type ListPaymentMethodsResponse,
  type RefundResponse,
  type RetrievePaymentIntentResponse,
  
  // Event Types
  type PaymentWebhookEvent,
  
  // Alternative type names with "Type" suffix for compatibility
  type PaymentErrorType,
  type PaymentMethodInput,
  type PaymentIntentInput,
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

// =============================================================================
// API CONTRACTS - Export EVERYTHING from all contract modules explicitly
// =============================================================================

// Payment API Contracts - ALL exports
export {
  PaymentAPIConfig,
  PaymentAPIClient,
  PaymentService,
  PaymentAPIError,
  PaymentAPIResult
} from './contracts/payment-api';

// Product API Contracts - ALL exports  
export {
  UploadedFile,
  BaseApiClient,
  ProductApiContract,
  ProductApiClient,
  HttpClientConfig,
  HttpMethod,
  RequestConfig,
  HttpResponse,
  HttpError,
  FileUploadConfig,
  MultipartFormData,
  TypedRequest,
  TypedResponse,
  ProductApiHandlers,
  ProductRepository,
  ProductService,
  API_ENDPOINTS,
  ApiEndpoint
} from './contracts/product-api';

// Portfolio API Contracts - ALL exports
export {
  PortfolioApiContract,
  PortfolioApiClient,
  PortfolioApiHandlers,
  PositionRepository,
  TransactionRepository,
  PortfolioRepository,
  PortfolioService,
  PORTFOLIO_API_ENDPOINTS,
  PortfolioApiEndpoint
} from './contracts/portfolio-api';

// =============================================================================
// CONFIGURATION - Export EVERYTHING from all config modules explicitly
// =============================================================================

// Payment Configuration - ALL exports
export {
  StripeConfig as StripeConfigDetailed,
  PayPalConfig,
  BankTransferConfig,
  CurrencyConfig,
  FeeConfig,
  SecurityConfig,
  ComplianceConfig,
  WebhookConfig,
  EnvironmentConfig,
  CacheConfig,
  NotificationConfig,
  PaymentConfig as PaymentConfigDetailed,
  ConfigValidator,
  ConfigValidationResult,
  ConfigLoader,
  DEFAULT_PAYMENT_CONFIG,
  ENV_VAR_MAPPINGS
} from './config/payment-config';

// =============================================================================
// UTILITY RE-EXPORTS - Common dependencies
// =============================================================================
export { z } from 'zod';

// =============================================================================
// PACKAGE METADATA
// =============================================================================
export const GOLDSPHERE_SHARED_VERSION = '1.0.7';
