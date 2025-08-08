import { Pagination } from './common';
export interface Position {
    id: string;
    userId: string;
    productId: string;
    purchaseDate: string;
    purchasePrice: number;
    marketPrice: number;
    quantity: number;
    issuingCountry: string;
    producer: string;
    certifiedProvenance: boolean;
    status: "active" | "closed";
    closedDate?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}
export interface Transaction {
    id: string;
    positionId: string;
    userId: string;
    type: "buy" | "sell";
    date: string;
    quantity: number;
    price: number;
    fees: number;
    notes?: string;
    createdAt: string;
}
export interface TransactionHistoryItem extends Transaction {
    productName: string;
    total: number;
}
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
export interface PositionsResponse {
    positions: Position[];
    pagination: Pagination;
}
export interface TransactionsResponse {
    transactions: TransactionHistoryItem[];
    pagination: Pagination;
}
//# sourceMappingURL=portfolio.d.ts.map