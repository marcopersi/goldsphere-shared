import { PaginationInfo } from './common';
import { Metal, Country, Producer, PaymentFrequency } from '../enums';
import { Product } from './products';

// Core entities
export interface Position {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  purchaseDate: Date; // ISO date string
  purchasePrice: number;
  marketPrice: number;
  quantity: number;
  issuingCountry: Country;
  producer: Producer;
  certifiedProvenance: boolean;
  status: "active" | "closed";
  closedDate?: Date; // ISO date string
  notes?: string;
  
  // Custody fields
  custodyServiceId?: string;
  custody?: {
    custodyServiceId: string;
    custodyServiceName: string;
    custodianId: string;
    custodianName: string;
    fee: number;
    paymentFrequency: PaymentFrequency;
  };
  
  createdAt: Date; // ISO date string
  updatedAt: Date; // ISO date string
}

export interface Transaction {
  id: string;
  positionId: string;
  userId: string;
  type: "buy" | "sell";
  date: Date; // ISO date string
  quantity: number;
  price: number;
  fees: number;
  notes?: string;
  createdAt: Date; // ISO date string
}

export interface TransactionHistoryItem extends Transaction {
  productName: string;
  total: number;
}

// Request/Response types
export interface PositionCreateRequest {
  productId: string;
  purchaseDate: Date;
  purchasePrice: number;
  quantity: number;
  issuingCountry: Country;
  producer: Producer;
  certifiedProvenance: boolean;
  notes?: string;
  custodyServiceId: string; // Required for position creation
}

export interface PositionUpdateRequest {
  marketPrice?: number;
  quantity?: number;
  notes?: string;
  status?: "active" | "closed";
  custodyServiceId?: string;
}

export interface TransactionCreateRequest {
  positionId: string;
  type: "buy" | "sell";
  date: Date;
  quantity: number;
  price: number;
  fees?: number;
  notes?: string;
}

// Portfolio Summary types
export interface MetalBreakdown {
  value: number;
  percentage: number;
  weight: number;
  positionCount: number;
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  totalGainLoss: number;
  totalGainLossPercentage: number;
  positionCount: number;
  metalBreakdown: {
    gold?: MetalBreakdown;
    silver?: MetalBreakdown;
    platinum?: MetalBreakdown;
    palladium?: MetalBreakdown;
  };
  lastUpdated: string;
}

// Query parameters
export interface PositionQueryParams {
  page?: number;
  limit?: number;
  status?: "active" | "closed";
  metal?: Metal;
  producer?: Producer;
}

export interface TransactionQueryParams {
  page?: number;
  limit?: number;
  type?: "buy" | "sell";
  positionId?: string;
  startDate?: Date;
  endDate?: Date;
}

// Response types
export interface PositionsResponse {
  positions: Position[];
  pagination: PaginationInfo;
}

export interface TransactionsResponse {
  transactions: TransactionHistoryItem[];
  pagination: PaginationInfo;
}