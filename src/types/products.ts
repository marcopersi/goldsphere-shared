import { Currency, ProductType, MetalType, WeightUnit, Pagination } from './common';

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  metal: MetalType;
  weight: number;
  weightUnit: WeightUnit;
  purity: number;
  price: number;
  currency: Currency;
  producer: string;
  country?: string;
  year?: number;
  description?: string;
  specifications?: Record<string, any>;
  imageUrl: string;
  inStock: boolean;
  stockQuantity?: number;
  minimumOrderQuantity: number;
  premiumPercentage?: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductRegistrationRequest {
  name: string;
  type: ProductType;
  metal: MetalType;
  weight: number;
  weightUnit: WeightUnit;
  purity: number;
  price: number;
  currency: Currency;
  producer: string;
  country?: string;
  year?: number;
  description?: string;
  specifications?: Record<string, any>;
  inStock?: boolean;
  stockQuantity?: number;
  minimumOrderQuantity?: number;
  premiumPercentage?: number;
  tags?: string[];
}

export interface ProductUpdateRequest {
  name?: string;
  price?: number;
  description?: string;
  specifications?: Record<string, any>;
  inStock?: boolean;
  stockQuantity?: number;
  minimumOrderQuantity?: number;
  premiumPercentage?: number;
  tags?: string[];
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

export interface BulkRegistrationRequest {
  products: ProductRegistrationRequest[];
}

export interface BulkRegistrationResponse {
  success: boolean;
  results: {
    product?: Product;
    status: 'success' | 'error';
    error?: string;
  }[];
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

// Query Parameters
export interface ProductQueryParams {
  page?: number;
  limit?: number;
  metal?: MetalType;
  type?: ProductType;
  producer?: string;
}
