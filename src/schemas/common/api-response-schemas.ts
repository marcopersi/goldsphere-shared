/**
 * Enhanced API Response Patterns
 * 
 * Generic response wrappers and pagination interfaces
 */

// Generic API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Enhanced Pagination Interface
export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// List Response Pattern
export interface ApiListResponse<T> extends ApiResponse<{
  items: T[];
  pagination: PaginationResponse;
}> {
  filters?: Record<string, unknown>;
}
