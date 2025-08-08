/**
 * GoldSphere Shared Library
 *
 * Pure TypeScript library with shared types, Zod schemas, and OpenAPI contracts
 * for the GoldSphere precious metals platform.
 */
export * from './types/common';
export * from './types/products';
export * from './types/portfolio';
export * from './types/trading';
export * from './types/payment';
export * from './types/ui';
export * from './validation/product-schemas';
export * from './validation/portfolio-schemas';
export * from './validation/payment-schemas';
export * from './contracts/product-api';
export * from './contracts/portfolio-api';
export * from './contracts/payment-api';
export { DEFAULT_PAYMENT_CONFIG, ENV_VAR_MAPPINGS } from './config/payment-config';
export { z } from 'zod';
export declare const GOLDSPHERE_SHARED_VERSION = "1.0.0";
//# sourceMappingURL=index.d.ts.map