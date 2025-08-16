// Trading API Types
import { PaginationInfo, PaymentMethodType, Address } from './common';
import { Metal, Currency, OrderType, OrderStatus } from '../enums';
import type { ShippingMethod } from '../validation/order-schemas';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  type: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  fees: {
    processing: number;
    shipping: number;
    insurance: number;
  };
  taxes: number;
  totalAmount: number;
  currency: string;
  shippingAddress: Address;
  paymentMethod: {
    type: PaymentMethodType;
    last4?: string;
  };
  // Optional per validation schema
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
  custodyServiceId?: string;
  certificateRequested?: boolean;
}

export interface OrderRequest {
  type: OrderType;
  items: {
    productId: string;
    quantity: number;
    custodyServiceId?: string;
  }[];
  shippingAddress?: Address;
  paymentMethod?: {
    type: PaymentMethodType;
    provider?: string;
    last4?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
    verified?: boolean;
  };
  custodyServiceId?: string;
  notes?: string;
}

export interface OrderUpdateRequest {
  shippingAddress?: Address;
  paymentMethod?: {
    type: PaymentMethodType;
    provider?: string;
    last4?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
    verified?: boolean;
  };
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
  type: OrderType;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export interface Quote {
  id: string;
  type: OrderType;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  fees: {
    processing: number;
    shipping: number;
    insurance: number;
  };
  taxes: number;
  totalAmount: number;
  currency: Currency;
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
  currency: Currency;
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
  currency: Currency;
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
  status?: OrderStatus;
  type?: OrderType;
  startDate?: Date;
  endDate?: Date;
}

export interface PriceQueryParams {
  metals?: Metal[];
  currency?: Currency;
}

export interface HistoricalPriceParams {
  metal: Metal;
  period: '1d' | '7d' | '1m' | '3m' | '6m' | '1y' | '5y';
  currency?: Currency;
}
