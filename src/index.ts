/**
 * GoldSphere Shared Library
 * 
 * Pure TypeScript library with shared types, Zod schemas, and OpenAPI contracts
 * for the GoldSphere precious metals platform.
 * 
 * COMPREHENSIVE EXPORTS - Everything you need for server, frontend, and any other project
 */

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
// VALIDATION SCHEMAS - Export everything from all validation modules
// =============================================================================
export * from './validation/product-schemas';
export * from './validation/portfolio-schemas';
export * from './validation/currency-schemas';

// Payment validation schemas - Export everything including Zod-inferred types
export * from './validation/payment-schemas';

// =============================================================================
// API CONTRACTS - Export everything from all contract modules
// =============================================================================
export * from './contracts/product-api';
export * from './contracts/portfolio-api';
export * from './contracts/payment-api';

// =============================================================================
// CONFIGURATION - Export everything from all config modules
// =============================================================================
export * from './config/payment-config';

// =============================================================================
// UTILITY RE-EXPORTS - Common dependencies
// =============================================================================
export { z } from 'zod';

// =============================================================================
// PACKAGE METADATA
// =============================================================================
export const GOLDSPHERE_SHARED_VERSION = '1.0.6';
