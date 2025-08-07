import { 
  Position, 
  PositionCreateRequest, 
  PositionUpdateRequest,
  PositionsResponse,
  PositionQueryParams,
  Transaction,
  TransactionCreateRequest,
  TransactionHistoryItem,
  TransactionsResponse,
  TransactionQueryParams,
  PortfolioSummary
} from '../types/portfolio';
import { ApiResponse } from '../types/products';
import { BaseApiClient, TypedRequest, TypedResponse } from './product-api';

/**
 * Portfolio API Contract Definitions
 * These define the exact shape of requests and responses for each endpoint
 */

// Portfolio API contract - defines all available endpoints
export interface PortfolioApiContract {
  // GET /positions
  'GET /positions': {
    query?: PositionQueryParams;
    response: PositionsResponse;
  };
  
  // GET /positions/{id}
  'GET /positions/{id}': {
    params: { id: string };
    response: Position;
  };
  
  // POST /positions
  'POST /positions': {
    body: PositionCreateRequest;
    response: { success: true; position: Position; message: string };
  };
  
  // PUT /positions/{id}
  'PUT /positions/{id}': {
    params: { id: string };
    body: PositionUpdateRequest;
    response: { success: true; position: Position; message: string };
  };
  
  // DELETE /positions/{id}
  'DELETE /positions/{id}': {
    params: { id: string };
    response: { success: true; message: string };
  };
  
  // GET /transactions
  'GET /transactions': {
    query?: TransactionQueryParams;
    response: TransactionsResponse;
  };
  
  // GET /transactions/{id}
  'GET /transactions/{id}': {
    params: { id: string };
    response: Transaction;
  };
  
  // POST /transactions
  'POST /transactions': {
    body: TransactionCreateRequest;
    response: { success: true; transaction: Transaction; message: string };
  };
  
  // GET /portfolio/summary
  'GET /portfolio/summary': {
    response: PortfolioSummary;
  };
}

// Portfolio API Client interface - defines the methods available on the client
export interface PortfolioApiClient extends BaseApiClient {
  // Position operations
  getPositions(params?: PositionQueryParams): Promise<ApiResponse<PositionsResponse>>;
  getPositionById(positionId: string): Promise<ApiResponse<Position>>;
  createPosition(position: PositionCreateRequest): Promise<ApiResponse<Position>>;
  updatePosition(positionId: string, updates: PositionUpdateRequest): Promise<ApiResponse<Position>>;
  closePosition(positionId: string): Promise<ApiResponse<void>>;
  
  // Transaction operations
  getTransactions(params?: TransactionQueryParams): Promise<ApiResponse<TransactionsResponse>>;
  getTransactionById(transactionId: string): Promise<ApiResponse<Transaction>>;
  recordTransaction(transaction: TransactionCreateRequest): Promise<ApiResponse<Transaction>>;
  
  // Portfolio operations
  getPortfolioSummary(): Promise<ApiResponse<PortfolioSummary>>;
}

/**
 * Server-side handler types for Express.js implementation
 */

// Portfolio API handlers for server implementation
export interface PortfolioApiHandlers {
  getPositions: (
    req: TypedRequest<never, never, PositionQueryParams>,
    res: TypedResponse<PositionsResponse>
  ) => Promise<void>;
  
  getPositionById: (
    req: TypedRequest<never, { positionId: string }>,
    res: TypedResponse<Position>
  ) => Promise<void>;
  
  createPosition: (
    req: TypedRequest<PositionCreateRequest>,
    res: TypedResponse<{ success: true; position: Position; message: string }>
  ) => Promise<void>;
  
  updatePosition: (
    req: TypedRequest<PositionUpdateRequest, { positionId: string }>,
    res: TypedResponse<{ success: true; position: Position; message: string }>
  ) => Promise<void>;
  
  closePosition: (
    req: TypedRequest<never, { positionId: string }>,
    res: TypedResponse<{ success: true; message: string }>
  ) => Promise<void>;
  
  getTransactions: (
    req: TypedRequest<never, never, TransactionQueryParams>,
    res: TypedResponse<TransactionsResponse>
  ) => Promise<void>;
  
  getTransactionById: (
    req: TypedRequest<never, { transactionId: string }>,
    res: TypedResponse<Transaction>
  ) => Promise<void>;
  
  recordTransaction: (
    req: TypedRequest<TransactionCreateRequest>,
    res: TypedResponse<{ success: true; transaction: Transaction; message: string }>
  ) => Promise<void>;
  
  getPortfolioSummary: (
    req: TypedRequest<never, never, never>,
    res: TypedResponse<PortfolioSummary>
  ) => Promise<void>;
}

// Database repository interface
export interface PositionRepository {
  findByUserId(userId: string, params: PositionQueryParams): Promise<{ positions: Position[]; total: number }>;
  findById(id: string, userId: string): Promise<Position | null>;
  create(position: Omit<Position, 'id' | 'createdAt' | 'updatedAt'>, userId: string): Promise<Position>;
  update(id: string, updates: Partial<Position>, userId: string): Promise<Position | null>;
  close(id: string, userId: string): Promise<boolean>;
}

export interface TransactionRepository {
  findByUserId(userId: string, params: TransactionQueryParams): Promise<{ transactions: TransactionHistoryItem[]; total: number }>;
  findById(id: string, userId: string): Promise<Transaction | null>;
  create(transaction: Omit<Transaction, 'id' | 'createdAt'>, userId: string): Promise<Transaction>;
  findByPositionId(positionId: string, userId: string): Promise<Transaction[]>;
}

export interface PortfolioRepository {
  calculateSummary(userId: string): Promise<PortfolioSummary>;
}

// Service layer interface
export interface PortfolioService {
  getPositions(userId: string, params: PositionQueryParams): Promise<PositionsResponse>;
  getPositionById(id: string, userId: string): Promise<Position>;
  createPosition(data: PositionCreateRequest, userId: string): Promise<Position>;
  updatePosition(id: string, data: PositionUpdateRequest, userId: string): Promise<Position>;
  closePosition(id: string, userId: string): Promise<void>;
  getTransactions(userId: string, params: TransactionQueryParams): Promise<TransactionsResponse>;
  getTransactionById(id: string, userId: string): Promise<Transaction>;
  recordTransaction(data: TransactionCreateRequest, userId: string): Promise<Transaction>;
  getPortfolioSummary(userId: string): Promise<PortfolioSummary>;
}

/**
 * OpenAPI endpoint mappings
 * Maps OpenAPI paths to TypeScript types
 */
export const PORTFOLIO_API_ENDPOINTS = {
  GET_POSITIONS: '/positions',
  GET_POSITION_BY_ID: '/positions/{positionId}',
  CREATE_POSITION: '/positions',
  UPDATE_POSITION: '/positions/{positionId}',
  CLOSE_POSITION: '/positions/{positionId}',
  GET_TRANSACTIONS: '/transactions',
  GET_TRANSACTION_BY_ID: '/transactions/{transactionId}',
  RECORD_TRANSACTION: '/transactions',
  GET_PORTFOLIO_SUMMARY: '/portfolio/summary',
} as const;

export type PortfolioApiEndpoint = typeof PORTFOLIO_API_ENDPOINTS[keyof typeof PORTFOLIO_API_ENDPOINTS];
