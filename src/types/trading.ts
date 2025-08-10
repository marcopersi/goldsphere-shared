// Trading API Types
import { Pagination, PaymentMethodType, Address } from './common';
import { Metal, Currency, OrderType, OrderStatus } from '../enums';

export interface Order {
  id: string;
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
  currency: Currency;
  shippingAddress: Address;
  paymentMethod: {
    type: PaymentMethodType;
    last4?: string;
  };
  tracking?: {
    carrier: string;
    trackingNumber: string;
    estimatedDelivery: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specifications?: Record<string, any>;
}

export interface OrderRequest {
  type: OrderType;
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: Address;
  paymentMethod: {
    type: PaymentMethodType;
    details?: Record<string, any>;
  };
  notes?: string;
}

export interface OrderUpdateRequest {
  shippingAddress?: Address;
  notes?: string;
}

export interface OrdersResponse {
  orders: Order[];
  pagination: Pagination;
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
  createdAt: string;
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
  startDate?: string;
  endDate?: string;
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
