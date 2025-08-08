import { 
  Product, 
  ProductRegistrationRequest, 
  ProductUpdateRequest,
  ProductsResponse,
  ProductQueryParams,
  BulkRegistrationRequest,
  BulkRegistrationResponse
} from '../types/products';
import { ApiResponse } from '../types/common';

// File upload types - compatible with Express.Multer.File but standalone
export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  destination?: string;
  filename?: string;
  path?: string;
  stream?: NodeJS.ReadableStream;
}

/**
 * API Contract Definitions
 * These define the exact shape of requests and responses for each endpoint
 */

// Base API client interface
export interface BaseApiClient {
  setAuthToken(token: string): void;
  clearAuthToken(): void;
  setBaseUrl(url: string): void;
  setTimeout(timeout: number): void;
}

// Product API contract - defines all available endpoints
export interface ProductApiContract {
  // GET /products
  'GET /products': {
    query?: ProductQueryParams;
    response: ProductsResponse;
  };
  
  // GET /products/{id}
  'GET /products/{id}': {
    params: { id: string };
    response: Product;
  };
  
  // POST /products (with file upload)
  'POST /products': {
    body: ProductRegistrationRequest;
    files?: { image: File };
    response: { success: true; product: Product; message: string };
  };
  
  // POST /products (JSON with base64 image)
  'POST /products/json': {
    body: ProductRegistrationRequest & { imageBase64?: string };
    response: { success: true; product: Product; message: string };
  };
  
  // PUT /products/{id}
  'PUT /products/{id}': {
    params: { id: string };
    body: ProductUpdateRequest;
    files?: { image?: File };
    response: { success: true; product: Product; message: string };
  };
  
  // DELETE /products/{id}
  'DELETE /products/{id}': {
    params: { id: string };
    response: { success: true; message: string };
  };
  
  // POST /products/bulk
  'POST /products/bulk': {
    body: BulkRegistrationRequest;
    response: BulkRegistrationResponse;
  };
}

// Product API Client interface - defines the methods available on the client
export interface ProductApiClient extends BaseApiClient {
  // Product CRUD operations
  getProducts(params?: ProductQueryParams): Promise<ApiResponse<ProductsResponse>>;
  getProductById(productId: string): Promise<ApiResponse<Product>>;
  createProduct(product: ProductRegistrationRequest, image?: File): Promise<ApiResponse<Product>>;
  createProductWithBase64(product: ProductRegistrationRequest, imageBase64?: string): Promise<ApiResponse<Product>>;
  updateProduct(productId: string, updates: ProductUpdateRequest, image?: File): Promise<ApiResponse<Product>>;
  deleteProduct(productId: string): Promise<ApiResponse<void>>;
  
  // Bulk operations
  bulkCreateProducts(request: BulkRegistrationRequest): Promise<ApiResponse<BulkRegistrationResponse>>;
}

// HTTP Client configuration
export interface HttpClientConfig {
  baseUrl: string;
  timeout?: number;
  defaultHeaders?: Record<string, string>;
  authToken?: string;
}

// HTTP Method types
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Request configuration for HTTP client
export interface RequestConfig {
  method: HttpMethod;
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  files?: Record<string, File>;
}

// Response type from HTTP client
export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

// Error types for HTTP client
export interface HttpError extends Error {
  response?: HttpResponse;
  status?: number;
  code?: string;
}

// File upload configuration
export interface FileUploadConfig {
  field: string;
  file: File;
  filename?: string;
  contentType?: string;
}

// Multipart form data structure
export interface MultipartFormData {
  fields: Record<string, string>;
  files: FileUploadConfig[];
}

/**
 * Server-side handler types for Express.js implementation
 */

// Express request with typed body and params
export interface TypedRequest<TBody = any, TParams = any, TQuery = any> {
  body: TBody;
  params: TParams;
  query: TQuery;
  file?: UploadedFile;
  files?: UploadedFile[];
  user?: { id: string; email: string }; // From JWT authentication
}

// Express response helpers
export interface TypedResponse<TData = any> {
  status(code: number): TypedResponse<TData>;
  json(data: TData): void;
}

// Product API handlers for server implementation
export interface ProductApiHandlers {
  getProducts: (
    req: TypedRequest<never, never, ProductQueryParams>,
    res: TypedResponse<ProductsResponse>
  ) => Promise<void>;
  
  getProductById: (
    req: TypedRequest<never, { productId: string }>,
    res: TypedResponse<Product>
  ) => Promise<void>;
  
  createProduct: (
    req: TypedRequest<ProductRegistrationRequest, never> & { file?: UploadedFile },
    res: TypedResponse<{ success: true; product: Product; message: string }>
  ) => Promise<void>;
  
  updateProduct: (
    req: TypedRequest<ProductUpdateRequest, { productId: string }> & { file?: UploadedFile },
    res: TypedResponse<{ success: true; product: Product; message: string }>
  ) => Promise<void>;
  
  deleteProduct: (
    req: TypedRequest<never, { productId: string }>,
    res: TypedResponse<{ success: true; message: string }>
  ) => Promise<void>;
  
  bulkCreateProducts: (
    req: TypedRequest<BulkRegistrationRequest>,
    res: TypedResponse<BulkRegistrationResponse>
  ) => Promise<void>;
}

// Database repository interface
export interface ProductRepository {
  findAll(params: ProductQueryParams): Promise<{ products: Product[]; total: number }>;
  findById(id: string): Promise<Product | null>;
  create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product>;
  update(id: string, updates: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
  bulkCreate(products: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[]): Promise<Product[]>;
}

// Service layer interface
export interface ProductService {
  getProducts(params: ProductQueryParams): Promise<ProductsResponse>;
  getProductById(id: string): Promise<Product>;
  createProduct(data: ProductRegistrationRequest, imageFile?: UploadedFile): Promise<Product>;
  updateProduct(id: string, data: ProductUpdateRequest, imageFile?: UploadedFile): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  bulkCreateProducts(data: BulkRegistrationRequest): Promise<BulkRegistrationResponse>;
}

/**
 * OpenAPI endpoint mappings
 * Maps OpenAPI paths to TypeScript types
 */
export const API_ENDPOINTS = {
  GET_PRODUCTS: '/products',
  GET_PRODUCT_BY_ID: '/products/{productId}',
  CREATE_PRODUCT: '/products',
  UPDATE_PRODUCT: '/products/{productId}',
  DELETE_PRODUCT: '/products/{productId}',
  BULK_CREATE_PRODUCTS: '/products/bulk',
} as const;

export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];
