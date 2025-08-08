import { Pagination } from './common';

// Core entities
export interface Position {
  id: string;
  userId: string;
  productId: string;
  purchaseDate: string; // ISO date string
  purchasePrice: number;
  marketPrice: number;
  quantity: number;
  issuingCountry: string;
  producer: string;
  certifiedProvenance: boolean;
  status: "active" | "closed";
  closedDate?: string; // ISO date string
  notes?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Transaction {
  id: string;
  positionId: string;
  userId: string;
  type: "buy" | "sell";
  date: string; // ISO date string
  quantity: number;
  price: number;
  fees: number;
  notes?: string;
  createdAt: string; // ISO date string
}

export interface TransactionHistoryItem extends Transaction {
  productName: string;
  total: number;
}

// Request/Response types
export interface PositionCreateRequest {
  productId: string;
  purchaseDate: string;
  purchasePrice: number;
  quantity: number;
  issuingCountry: string;
  producer: string;
  certifiedProvenance: boolean;
  notes?: string;
}

export interface PositionUpdateRequest {
  marketPrice?: number;
  quantity?: number;
  notes?: string;
  status?: "active" | "closed";
}

export interface TransactionCreateRequest {
  positionId: string;
  type: "buy" | "sell";
  date: string;
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
  metal?: "gold" | "silver" | "platinum" | "palladium";
  producer?: string;
}

export interface TransactionQueryParams {
  page?: number;
  limit?: number;
  type?: "buy" | "sell";
  positionId?: string;
  startDate?: string;
  endDate?: string;
}

// Response types
export interface PositionsResponse {
  positions: Position[];
  pagination: Pagination;
}

export interface TransactionsResponse {
  transactions: TransactionHistoryItem[];
  pagination: Pagination;
}