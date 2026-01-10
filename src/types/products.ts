import { WeightUnit, PaginationInfo } from './common';
import { Metal, ProductType, Country, Currency } from '../enums';

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  metal: Metal;
  weight: number;
  weightUnit: WeightUnit;
  purity: number;
  marketPrice: number;
  currency: Currency;
  country?: Country;
  year?: number;
  description?: string;
  imageUrl: string;
  inStock: boolean;
  stockQuantity?: number;
  minimumOrderQuantity: number;
  premiumPercentage?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductRegistrationRequest {
  name: string;
  type: ProductType;
  metal: Metal;
  weight: number;
  weightUnit: WeightUnit;
  purity: number;
  price: number;
  currency: Currency;
  country?: Country;
  year?: number;
  description?: string;
  inStock?: boolean;
  stockQuantity?: number;
  minimumOrderQuantity?: number;
  premiumPercentage?: number;
}

export interface ProductUpdateRequest {
  name?: string;
  price?: number;
  description?: string;
  inStock?: boolean;
  stockQuantity?: number;
  minimumOrderQuantity?: number;
  premiumPercentage?: number;
}

export interface ProductsResponse {
  success: boolean;
  data: {
    products: Product[];
    pagination: PaginationInfo;
  };
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
  metal?: Metal;
  type?: ProductType;
}
