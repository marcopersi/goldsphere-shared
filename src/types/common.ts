/**
 * Common Types for GoldSphere Shared
 * 
 * This file contains shared types that are used across multiple modules
 * to avoid duplication and maintain consistency.
 */

import { Currency } from "../enums";

export interface DeliveryOption {
  id: string;
  title: string;
  description: string;
  additionalInfo: string;
  price: number;
  currency: Currency;
  type: "shipping" | "custody";
  billingCycle?: "monthly" | "yearly";
}

/**
 * Weight units for precious metals
 */
export type WeightUnit = 'grams' | 'troy_ounces' | 'kilograms';


/**
 * Payment method types
 */
export type PaymentMethodType = 'card' | 'bank_transfer' | 'sepa_debit';

// =====================================
// API RESPONSE TYPES
// =====================================

/**
 * Standard pagination parameters for list operations
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
  cursor?: string;
}

/**
 * Standard pagination metadata
 */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Alternative pagination for cursor-based pagination
 */
export interface CursorPagination {
  hasMore: boolean;
  total?: number;
  nextCursor?: string;
  previousCursor?: string;
}

/**
 * Paginated response wrapper (traditional pagination)
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

/**
 * Cursor-based paginated response wrapper
 */
export interface CursorPaginatedResponse<T> {
  data: T[];
  pagination: CursorPagination;
}

/**
 * Success response wrapper
 */
export interface ApiSuccess<T = any> {
  success: true;
  data?: T;
  message?: string;
}

/**
 * Error detail for validation errors
 */
export interface ApiErrorDetail {
  field: string;
  message: string;
}

/**
 * Error response wrapper
 */
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetail[];
  };
}

/**
 * Generic API response type
 */
export type ApiResponse<T = any> = ApiSuccess<T> | ApiError;

// =====================================
// HTTP CLIENT TYPES
// =====================================

/**
 * Request options for HTTP client
 */
export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
  retries?: number;
}

/**
 * Standard HTTP response wrapper
 */
export interface HTTPResponse<T = unknown> {
  data: T;
  status: number;
  headers: Record<string, string>;
  statusText: string;
}

/**
 * HTTP client interface for making API requests
 */
export interface HTTPClient {
  get<T>(url: string, options?: RequestOptions): Promise<HTTPResponse<T>>;
  post<T>(url: string, data?: unknown, options?: RequestOptions): Promise<HTTPResponse<T>>;
  put<T>(url: string, data?: unknown, options?: RequestOptions): Promise<HTTPResponse<T>>;
  delete<T>(url: string, options?: RequestOptions): Promise<HTTPResponse<T>>;
}

// =====================================
// UTILITY TYPES
// =====================================

/**
 * Utility type for API operation results
 */
export type OperationResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: APIError;
};

/**
 * Base API error interface
 */
export interface APIError {
  type: string;
  code: string;
  message: string;
}

/**
 * Network-related errors
 */
export interface NetworkError extends APIError {
  type: 'network_error';
  originalError?: Error;
}

/**
 * Timeout errors
 */
export interface TimeoutError extends APIError {
  type: 'timeout_error';
  timeout: number;
}

/**
 * Rate limit errors
 */
export interface RateLimitError extends APIError {
  type: 'rate_limit_error';
  retryAfter?: number;
}

/**
 * Validation errors
 */
export interface ValidationError extends APIError {
  type: 'validation_error';
  fields: ApiErrorDetail[];
}

// =====================================
// ADDRESS TYPES
// =====================================

/**
 * Address type for shipping/billing
 */
export interface Address {
  id?: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

// =====================================
// TIMESTAMP TYPES
// =====================================

/**
 * Standard timestamp fields for entities
 */
export interface Timestamps {
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

/**
 * Optional timestamp fields
 */
export interface OptionalTimestamps {
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}

// =====================================
// PROVIDER CONFIGURATION TYPES
// =====================================

/**
 * Payment provider types
 */
export type PaymentProvider = 'stripe' | 'paypal' | 'bank_transfer' | 'mock';

/**
 * Base configuration for payment providers
 */
export interface BaseProviderConfig {
  provider: PaymentProvider;
  enabled: boolean;
  testMode?: boolean;
}

/**
 * Environment types
 */
export type Environment = 'development' | 'staging' | 'production';

/**
 * API mode types for testing
 */
export type ApiMode = 'mock' | 'development' | 'production';

/**
 * Base API configuration
 */
export interface BaseApiConfig {
  mode: ApiMode;
  baseUrl: string;
  timeout: number;
  environment: Environment;
}
