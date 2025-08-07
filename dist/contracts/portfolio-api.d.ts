import { Position, PositionCreateRequest, PositionUpdateRequest, PositionsResponse, PositionQueryParams, Transaction, TransactionCreateRequest, TransactionHistoryItem, TransactionsResponse, TransactionQueryParams, PortfolioSummary } from '../types/portfolio';
import { ApiResponse } from '../types/products';
import { BaseApiClient, TypedRequest, TypedResponse } from './product-api';
/**
 * Portfolio API Contract Definitions
 * These define the exact shape of requests and responses for each endpoint
 */
export interface PortfolioApiContract {
    'GET /positions': {
        query?: PositionQueryParams;
        response: PositionsResponse;
    };
    'GET /positions/{id}': {
        params: {
            id: string;
        };
        response: Position;
    };
    'POST /positions': {
        body: PositionCreateRequest;
        response: {
            success: true;
            position: Position;
            message: string;
        };
    };
    'PUT /positions/{id}': {
        params: {
            id: string;
        };
        body: PositionUpdateRequest;
        response: {
            success: true;
            position: Position;
            message: string;
        };
    };
    'DELETE /positions/{id}': {
        params: {
            id: string;
        };
        response: {
            success: true;
            message: string;
        };
    };
    'GET /transactions': {
        query?: TransactionQueryParams;
        response: TransactionsResponse;
    };
    'GET /transactions/{id}': {
        params: {
            id: string;
        };
        response: Transaction;
    };
    'POST /transactions': {
        body: TransactionCreateRequest;
        response: {
            success: true;
            transaction: Transaction;
            message: string;
        };
    };
    'GET /portfolio/summary': {
        response: PortfolioSummary;
    };
}
export interface PortfolioApiClient extends BaseApiClient {
    getPositions(params?: PositionQueryParams): Promise<ApiResponse<PositionsResponse>>;
    getPositionById(positionId: string): Promise<ApiResponse<Position>>;
    createPosition(position: PositionCreateRequest): Promise<ApiResponse<Position>>;
    updatePosition(positionId: string, updates: PositionUpdateRequest): Promise<ApiResponse<Position>>;
    closePosition(positionId: string): Promise<ApiResponse<void>>;
    getTransactions(params?: TransactionQueryParams): Promise<ApiResponse<TransactionsResponse>>;
    getTransactionById(transactionId: string): Promise<ApiResponse<Transaction>>;
    recordTransaction(transaction: TransactionCreateRequest): Promise<ApiResponse<Transaction>>;
    getPortfolioSummary(): Promise<ApiResponse<PortfolioSummary>>;
}
/**
 * Server-side handler types for Express.js implementation
 */
export interface PortfolioApiHandlers {
    getPositions: (req: TypedRequest<never, never, PositionQueryParams>, res: TypedResponse<PositionsResponse>) => Promise<void>;
    getPositionById: (req: TypedRequest<never, {
        positionId: string;
    }>, res: TypedResponse<Position>) => Promise<void>;
    createPosition: (req: TypedRequest<PositionCreateRequest>, res: TypedResponse<{
        success: true;
        position: Position;
        message: string;
    }>) => Promise<void>;
    updatePosition: (req: TypedRequest<PositionUpdateRequest, {
        positionId: string;
    }>, res: TypedResponse<{
        success: true;
        position: Position;
        message: string;
    }>) => Promise<void>;
    closePosition: (req: TypedRequest<never, {
        positionId: string;
    }>, res: TypedResponse<{
        success: true;
        message: string;
    }>) => Promise<void>;
    getTransactions: (req: TypedRequest<never, never, TransactionQueryParams>, res: TypedResponse<TransactionsResponse>) => Promise<void>;
    getTransactionById: (req: TypedRequest<never, {
        transactionId: string;
    }>, res: TypedResponse<Transaction>) => Promise<void>;
    recordTransaction: (req: TypedRequest<TransactionCreateRequest>, res: TypedResponse<{
        success: true;
        transaction: Transaction;
        message: string;
    }>) => Promise<void>;
    getPortfolioSummary: (req: TypedRequest<never, never, never>, res: TypedResponse<PortfolioSummary>) => Promise<void>;
}
export interface PositionRepository {
    findByUserId(userId: string, params: PositionQueryParams): Promise<{
        positions: Position[];
        total: number;
    }>;
    findById(id: string, userId: string): Promise<Position | null>;
    create(position: Omit<Position, 'id' | 'createdAt' | 'updatedAt'>, userId: string): Promise<Position>;
    update(id: string, updates: Partial<Position>, userId: string): Promise<Position | null>;
    close(id: string, userId: string): Promise<boolean>;
}
export interface TransactionRepository {
    findByUserId(userId: string, params: TransactionQueryParams): Promise<{
        transactions: TransactionHistoryItem[];
        total: number;
    }>;
    findById(id: string, userId: string): Promise<Transaction | null>;
    create(transaction: Omit<Transaction, 'id' | 'createdAt'>, userId: string): Promise<Transaction>;
    findByPositionId(positionId: string, userId: string): Promise<Transaction[]>;
}
export interface PortfolioRepository {
    calculateSummary(userId: string): Promise<PortfolioSummary>;
}
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
export declare const PORTFOLIO_API_ENDPOINTS: {
    readonly GET_POSITIONS: "/positions";
    readonly GET_POSITION_BY_ID: "/positions/{positionId}";
    readonly CREATE_POSITION: "/positions";
    readonly UPDATE_POSITION: "/positions/{positionId}";
    readonly CLOSE_POSITION: "/positions/{positionId}";
    readonly GET_TRANSACTIONS: "/transactions";
    readonly GET_TRANSACTION_BY_ID: "/transactions/{transactionId}";
    readonly RECORD_TRANSACTION: "/transactions";
    readonly GET_PORTFOLIO_SUMMARY: "/portfolio/summary";
};
export type PortfolioApiEndpoint = typeof PORTFOLIO_API_ENDPOINTS[keyof typeof PORTFOLIO_API_ENDPOINTS];
//# sourceMappingURL=portfolio-api.d.ts.map