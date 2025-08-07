/**
 * GoldSphere Shared Library
 * 
 * Pure TypeScript library with shared types, Zod schemas, and OpenAPI contracts
 * for the GoldSphere precious metals platform.
 */

// Core Types
export * from './types/products';
export * from './types/portfolio';

// Validation Schemas (Zod)
export * from './validation/product-schemas';
export * from './validation/portfolio-schemas';

// API Contracts & Handlers
export * from './contracts/product-api';
export * from './contracts/portfolio-api';

// Utility Re-exports
export { z } from 'zod';

// Package Metadata
export const GOLDSPHERE_SHARED_VERSION = '1.0.0';
