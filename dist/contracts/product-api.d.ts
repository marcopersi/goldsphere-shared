import { Product, ProductRegistrationRequest, ProductUpdateRequest, ProductsResponse, ProductQueryParams, BulkRegistrationRequest, BulkRegistrationResponse } from '../types/products';
import { ApiResponse } from '../types/common';
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
export interface BaseApiClient {
    setAuthToken(token: string): void;
    clearAuthToken(): void;
    setBaseUrl(url: string): void;
    setTimeout(timeout: number): void;
}
export interface ProductApiContract {
    'GET /products': {
        query?: ProductQueryParams;
        response: ProductsResponse;
    };
    'GET /products/{id}': {
        params: {
            id: string;
        };
        response: Product;
    };
    'POST /products': {
        body: ProductRegistrationRequest;
        files?: {
            image: File;
        };
        response: {
            success: true;
            product: Product;
            message: string;
        };
    };
    'POST /products/json': {
        body: ProductRegistrationRequest & {
            imageBase64?: string;
        };
        response: {
            success: true;
            product: Product;
            message: string;
        };
    };
    'PUT /products/{id}': {
        params: {
            id: string;
        };
        body: ProductUpdateRequest;
        files?: {
            image?: File;
        };
        response: {
            success: true;
            product: Product;
            message: string;
        };
    };
    'DELETE /products/{id}': {
        params: {
            id: string;
        };
        response: {
            success: true;
            message: string;
        };
    };
    'POST /products/bulk': {
        body: BulkRegistrationRequest;
        response: BulkRegistrationResponse;
    };
}
export interface ProductApiClient extends BaseApiClient {
    getProducts(params?: ProductQueryParams): Promise<ApiResponse<ProductsResponse>>;
    getProductById(productId: string): Promise<ApiResponse<Product>>;
    createProduct(product: ProductRegistrationRequest, image?: File): Promise<ApiResponse<Product>>;
    createProductWithBase64(product: ProductRegistrationRequest, imageBase64?: string): Promise<ApiResponse<Product>>;
    updateProduct(productId: string, updates: ProductUpdateRequest, image?: File): Promise<ApiResponse<Product>>;
    deleteProduct(productId: string): Promise<ApiResponse<void>>;
    bulkCreateProducts(request: BulkRegistrationRequest): Promise<ApiResponse<BulkRegistrationResponse>>;
}
export interface HttpClientConfig {
    baseUrl: string;
    timeout?: number;
    defaultHeaders?: Record<string, string>;
    authToken?: string;
}
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export interface RequestConfig {
    method: HttpMethod;
    url: string;
    data?: any;
    params?: Record<string, any>;
    headers?: Record<string, string>;
    timeout?: number;
    files?: Record<string, File>;
}
export interface HttpResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
}
export interface HttpError extends Error {
    response?: HttpResponse;
    status?: number;
    code?: string;
}
export interface FileUploadConfig {
    field: string;
    file: File;
    filename?: string;
    contentType?: string;
}
export interface MultipartFormData {
    fields: Record<string, string>;
    files: FileUploadConfig[];
}
/**
 * Server-side handler types for Express.js implementation
 */
export interface TypedRequest<TBody = any, TParams = any, TQuery = any> {
    body: TBody;
    params: TParams;
    query: TQuery;
    file?: UploadedFile;
    files?: UploadedFile[];
    user?: {
        id: string;
        email: string;
    };
}
export interface TypedResponse<TData = any> {
    status(code: number): TypedResponse<TData>;
    json(data: TData): void;
}
export interface ProductApiHandlers {
    getProducts: (req: TypedRequest<never, never, ProductQueryParams>, res: TypedResponse<ProductsResponse>) => Promise<void>;
    getProductById: (req: TypedRequest<never, {
        productId: string;
    }>, res: TypedResponse<Product>) => Promise<void>;
    createProduct: (req: TypedRequest<ProductRegistrationRequest, never> & {
        file?: UploadedFile;
    }, res: TypedResponse<{
        success: true;
        product: Product;
        message: string;
    }>) => Promise<void>;
    updateProduct: (req: TypedRequest<ProductUpdateRequest, {
        productId: string;
    }> & {
        file?: UploadedFile;
    }, res: TypedResponse<{
        success: true;
        product: Product;
        message: string;
    }>) => Promise<void>;
    deleteProduct: (req: TypedRequest<never, {
        productId: string;
    }>, res: TypedResponse<{
        success: true;
        message: string;
    }>) => Promise<void>;
    bulkCreateProducts: (req: TypedRequest<BulkRegistrationRequest>, res: TypedResponse<BulkRegistrationResponse>) => Promise<void>;
}
export interface ProductRepository {
    findAll(params: ProductQueryParams): Promise<{
        products: Product[];
        total: number;
    }>;
    findById(id: string): Promise<Product | null>;
    create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product>;
    update(id: string, updates: Partial<Product>): Promise<Product | null>;
    delete(id: string): Promise<boolean>;
    bulkCreate(products: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[]): Promise<Product[]>;
}
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
export declare const API_ENDPOINTS: {
    readonly GET_PRODUCTS: "/products";
    readonly GET_PRODUCT_BY_ID: "/products/{productId}";
    readonly CREATE_PRODUCT: "/products";
    readonly UPDATE_PRODUCT: "/products/{productId}";
    readonly DELETE_PRODUCT: "/products/{productId}";
    readonly BULK_CREATE_PRODUCTS: "/products/bulk";
};
export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];
//# sourceMappingURL=product-api.d.ts.map