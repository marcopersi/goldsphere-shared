// Trading API Types
import { PaginationInfo } from './common';
import { Metal, OrderSource, OrderType, OrderStatus } from '../enums';
import type { ShippingMethod } from '../validation/order-schemas';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  type: OrderType;
  status: OrderStatus;
  source: OrderSource;
  items: OrderItem[];
  subtotal: number;
  taxes: number;
  totalAmount: number;
  currency: string; // ISO 4217 (e.g., USD)
  // Optional per validation schema
  custodyServiceId?: string;
  shippingMethod?: ShippingMethod;
  tracking?: {
    carrier: string;
    trackingNumber: string;
    estimatedDelivery: string;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  // Present in validation schema
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  // Optional fields per validation schema
  certificateRequested?: boolean;
}

export interface OrderRequest {
  type: 'buy' | 'sell';
  currency: string; // ISO 4217 (e.g., USD)
  items: {
    productId: string;
    quantity: number;
  }[];
  custodyServiceId?: string;
  notes?: string;
}

export interface OrderUpdateRequest {
  shippingMethod?: ShippingMethod;
  tracking?: {
    trackingNumber?: string;
    trackingUrl?: string;
    signatureRequired?: boolean;
  };
  notes?: string;
}

export interface OrdersResponse {
  orders: Order[];
  pagination: PaginationInfo;
  user?: {
    id: string;
  };
}

export interface AdminOrdersResponse {
  orders: Order[];
  pagination: PaginationInfo;
  statistics: {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    uniqueUsers: number;
  };
  filters: {
    status?: string;
    type?: string;
    userId?: string;
  };
  adminContext: {
    requestedBy: string;
    role: string;
  };
}

export interface SmartOrdersResponse {
  orders: Order[];
  pagination: PaginationInfo;
  context: {
    requestedBy: string;
    viewingOrdersFor: string;
    endpointType: string;
    suggestion?: string;
  };
}

export interface QuoteRequest {
  type: 'buy' | 'sell';
  items: {
    productId: string;
    quantity: number;
  }[];
}

export interface Quote {
  id: string;
  type: 'buy' | 'sell';
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  taxes: number;
  totalAmount: number;
  currency: string; // ISO 4217 (e.g., USD)
  validUntil: string;
  marketConditions: {
    spotPrice: number;
    premium: number;
    volatility: 'low' | 'medium' | 'high';
  };
  createdAt: Date;
}

export interface MetalPrice {
  price: number;
  currency: string; // ISO 4217 (e.g., USD)
  unit: string;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
}

export interface LivePricesResponse {
  prices: {
    gold?: MetalPrice;
    silver?: MetalPrice;
    platinum?: MetalPrice;
    palladium?: MetalPrice;
  };
  timestamp: string;
  source: string;
}

export interface HistoricalPriceData {
  metal: Metal;
  currency: string; // ISO 4217 (e.g., USD)
  period: '1d' | '7d' | '1m' | '3m' | '6m' | '1y' | '5y';
  data: {
    timestamp: string;
    price: number;
    volume: number;
  }[];
}

export interface OrderQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  type?: 'buy' | 'sell';
  startDate?: Date;
  endDate?: Date;
}

export interface PriceQueryParams {
  metals?: Metal[];
  currency?: string; // ISO 4217 (e.g., USD)
}

export interface HistoricalPriceParams {
  metal: Metal;
  period: '1d' | '7d' | '1m' | '3m' | '6m' | '1y' | '5y';
  currency?: string; // ISO 4217 (e.g., USD)
}
