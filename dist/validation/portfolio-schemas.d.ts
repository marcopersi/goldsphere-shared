import { z } from 'zod';
export declare const PositionStatusSchema: z.ZodEnum<["active", "closed"]>;
export declare const TransactionTypeSchema: z.ZodEnum<["buy", "sell"]>;
export declare const PositionSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    productId: z.ZodString;
    purchaseDate: z.ZodString;
    purchasePrice: z.ZodNumber;
    marketPrice: z.ZodNumber;
    quantity: z.ZodNumber;
    issuingCountry: z.ZodString;
    producer: z.ZodString;
    certifiedProvenance: z.ZodBoolean;
    status: z.ZodEnum<["active", "closed"]>;
    closedDate: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "active" | "closed";
    id: string;
    producer: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    productId: string;
    purchaseDate: string;
    purchasePrice: number;
    marketPrice: number;
    quantity: number;
    issuingCountry: string;
    certifiedProvenance: boolean;
    closedDate?: string | undefined;
    notes?: string | undefined;
}, {
    status: "active" | "closed";
    id: string;
    producer: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    productId: string;
    purchaseDate: string;
    purchasePrice: number;
    marketPrice: number;
    quantity: number;
    issuingCountry: string;
    certifiedProvenance: boolean;
    closedDate?: string | undefined;
    notes?: string | undefined;
}>;
export declare const PositionCreateRequestSchema: z.ZodObject<{
    productId: z.ZodString;
    purchaseDate: z.ZodString;
    purchasePrice: z.ZodNumber;
    quantity: z.ZodNumber;
    issuingCountry: z.ZodString;
    producer: z.ZodString;
    certifiedProvenance: z.ZodBoolean;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    producer: string;
    productId: string;
    purchaseDate: string;
    purchasePrice: number;
    quantity: number;
    issuingCountry: string;
    certifiedProvenance: boolean;
    notes?: string | undefined;
}, {
    producer: string;
    productId: string;
    purchaseDate: string;
    purchasePrice: number;
    quantity: number;
    issuingCountry: string;
    certifiedProvenance: boolean;
    notes?: string | undefined;
}>;
export declare const PositionUpdateRequestSchema: z.ZodObject<{
    marketPrice: z.ZodOptional<z.ZodNumber>;
    quantity: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["active", "closed"]>>;
}, "strip", z.ZodTypeAny, {
    status?: "active" | "closed" | undefined;
    marketPrice?: number | undefined;
    quantity?: number | undefined;
    notes?: string | undefined;
}, {
    status?: "active" | "closed" | undefined;
    marketPrice?: number | undefined;
    quantity?: number | undefined;
    notes?: string | undefined;
}>;
export declare const TransactionSchema: z.ZodObject<{
    id: z.ZodString;
    positionId: z.ZodString;
    userId: z.ZodString;
    type: z.ZodEnum<["buy", "sell"]>;
    date: z.ZodString;
    quantity: z.ZodNumber;
    price: z.ZodNumber;
    fees: z.ZodDefault<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "buy" | "sell";
    id: string;
    price: number;
    createdAt: string;
    date: string;
    userId: string;
    quantity: number;
    positionId: string;
    fees: number;
    notes?: string | undefined;
}, {
    type: "buy" | "sell";
    id: string;
    price: number;
    createdAt: string;
    date: string;
    userId: string;
    quantity: number;
    positionId: string;
    notes?: string | undefined;
    fees?: number | undefined;
}>;
export declare const TransactionCreateRequestSchema: z.ZodObject<{
    positionId: z.ZodString;
    type: z.ZodEnum<["buy", "sell"]>;
    date: z.ZodString;
    quantity: z.ZodNumber;
    price: z.ZodNumber;
    fees: z.ZodDefault<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "buy" | "sell";
    price: number;
    date: string;
    quantity: number;
    positionId: string;
    fees: number;
    notes?: string | undefined;
}, {
    type: "buy" | "sell";
    price: number;
    date: string;
    quantity: number;
    positionId: string;
    notes?: string | undefined;
    fees?: number | undefined;
}>;
export declare const TransactionHistoryItemSchema: z.ZodObject<{
    id: z.ZodString;
    positionId: z.ZodString;
    userId: z.ZodString;
    type: z.ZodEnum<["buy", "sell"]>;
    date: z.ZodString;
    quantity: z.ZodNumber;
    price: z.ZodNumber;
    fees: z.ZodDefault<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
} & {
    productName: z.ZodString;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "buy" | "sell";
    id: string;
    price: number;
    createdAt: string;
    total: number;
    date: string;
    userId: string;
    quantity: number;
    positionId: string;
    fees: number;
    productName: string;
    notes?: string | undefined;
}, {
    type: "buy" | "sell";
    id: string;
    price: number;
    createdAt: string;
    total: number;
    date: string;
    userId: string;
    quantity: number;
    positionId: string;
    productName: string;
    notes?: string | undefined;
    fees?: number | undefined;
}>;
export declare const MetalBreakdownSchema: z.ZodObject<{
    value: z.ZodNumber;
    percentage: z.ZodNumber;
    weight: z.ZodNumber;
    positionCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    value: number;
    weight: number;
    percentage: number;
    positionCount: number;
}, {
    value: number;
    weight: number;
    percentage: number;
    positionCount: number;
}>;
export declare const PortfolioSummarySchema: z.ZodObject<{
    totalValue: z.ZodNumber;
    totalCost: z.ZodNumber;
    totalGainLoss: z.ZodNumber;
    totalGainLossPercentage: z.ZodNumber;
    positionCount: z.ZodNumber;
    metalBreakdown: z.ZodObject<{
        gold: z.ZodOptional<z.ZodObject<{
            value: z.ZodNumber;
            percentage: z.ZodNumber;
            weight: z.ZodNumber;
            positionCount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        }, {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        }>>;
        silver: z.ZodOptional<z.ZodObject<{
            value: z.ZodNumber;
            percentage: z.ZodNumber;
            weight: z.ZodNumber;
            positionCount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        }, {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        }>>;
        platinum: z.ZodOptional<z.ZodObject<{
            value: z.ZodNumber;
            percentage: z.ZodNumber;
            weight: z.ZodNumber;
            positionCount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        }, {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        }>>;
        palladium: z.ZodOptional<z.ZodObject<{
            value: z.ZodNumber;
            percentage: z.ZodNumber;
            weight: z.ZodNumber;
            positionCount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        }, {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        gold?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
        silver?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
        platinum?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
        palladium?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
    }, {
        gold?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
        silver?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
        platinum?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
        palladium?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
    }>;
    lastUpdated: z.ZodString;
}, "strip", z.ZodTypeAny, {
    positionCount: number;
    totalValue: number;
    totalCost: number;
    totalGainLoss: number;
    totalGainLossPercentage: number;
    metalBreakdown: {
        gold?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
        silver?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
        platinum?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
        palladium?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
    };
    lastUpdated: string;
}, {
    positionCount: number;
    totalValue: number;
    totalCost: number;
    totalGainLoss: number;
    totalGainLossPercentage: number;
    metalBreakdown: {
        gold?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
        silver?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
        platinum?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
        palladium?: {
            value: number;
            weight: number;
            percentage: number;
            positionCount: number;
        } | undefined;
    };
    lastUpdated: string;
}>;
export declare const PositionQueryParamsSchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    status: z.ZodOptional<z.ZodEnum<["active", "closed"]>>;
    metal: z.ZodOptional<z.ZodEnum<["gold", "silver", "platinum", "palladium"]>>;
    producer: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "active" | "closed" | undefined;
    metal?: "gold" | "silver" | "platinum" | "palladium" | undefined;
    producer?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}, {
    status?: "active" | "closed" | undefined;
    metal?: "gold" | "silver" | "platinum" | "palladium" | undefined;
    producer?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare const TransactionQueryParamsSchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    type: z.ZodOptional<z.ZodEnum<["buy", "sell"]>>;
    positionId: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: "buy" | "sell" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    positionId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    type?: "buy" | "sell" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    positionId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
export declare const PositionsResponseSchema: z.ZodObject<{
    positions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        productId: z.ZodString;
        purchaseDate: z.ZodString;
        purchasePrice: z.ZodNumber;
        marketPrice: z.ZodNumber;
        quantity: z.ZodNumber;
        issuingCountry: z.ZodString;
        producer: z.ZodString;
        certifiedProvenance: z.ZodBoolean;
        status: z.ZodEnum<["active", "closed"]>;
        closedDate: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "active" | "closed";
        id: string;
        producer: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        productId: string;
        purchaseDate: string;
        purchasePrice: number;
        marketPrice: number;
        quantity: number;
        issuingCountry: string;
        certifiedProvenance: boolean;
        closedDate?: string | undefined;
        notes?: string | undefined;
    }, {
        status: "active" | "closed";
        id: string;
        producer: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        productId: string;
        purchaseDate: string;
        purchasePrice: number;
        marketPrice: number;
        quantity: number;
        issuingCountry: string;
        certifiedProvenance: boolean;
        closedDate?: string | undefined;
        notes?: string | undefined;
    }>, "many">;
    pagination: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
        hasNext: z.ZodBoolean;
        hasPrev: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    positions: {
        status: "active" | "closed";
        id: string;
        producer: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        productId: string;
        purchaseDate: string;
        purchasePrice: number;
        marketPrice: number;
        quantity: number;
        issuingCountry: string;
        certifiedProvenance: boolean;
        closedDate?: string | undefined;
        notes?: string | undefined;
    }[];
}, {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    positions: {
        status: "active" | "closed";
        id: string;
        producer: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        productId: string;
        purchaseDate: string;
        purchasePrice: number;
        marketPrice: number;
        quantity: number;
        issuingCountry: string;
        certifiedProvenance: boolean;
        closedDate?: string | undefined;
        notes?: string | undefined;
    }[];
}>;
export declare const TransactionsResponseSchema: z.ZodObject<{
    transactions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        positionId: z.ZodString;
        userId: z.ZodString;
        type: z.ZodEnum<["buy", "sell"]>;
        date: z.ZodString;
        quantity: z.ZodNumber;
        price: z.ZodNumber;
        fees: z.ZodDefault<z.ZodNumber>;
        notes: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
    } & {
        productName: z.ZodString;
        total: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "buy" | "sell";
        id: string;
        price: number;
        createdAt: string;
        total: number;
        date: string;
        userId: string;
        quantity: number;
        positionId: string;
        fees: number;
        productName: string;
        notes?: string | undefined;
    }, {
        type: "buy" | "sell";
        id: string;
        price: number;
        createdAt: string;
        total: number;
        date: string;
        userId: string;
        quantity: number;
        positionId: string;
        productName: string;
        notes?: string | undefined;
        fees?: number | undefined;
    }>, "many">;
    pagination: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
        hasNext: z.ZodBoolean;
        hasPrev: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    transactions: {
        type: "buy" | "sell";
        id: string;
        price: number;
        createdAt: string;
        total: number;
        date: string;
        userId: string;
        quantity: number;
        positionId: string;
        fees: number;
        productName: string;
        notes?: string | undefined;
    }[];
}, {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    transactions: {
        type: "buy" | "sell";
        id: string;
        price: number;
        createdAt: string;
        total: number;
        date: string;
        userId: string;
        quantity: number;
        positionId: string;
        productName: string;
        notes?: string | undefined;
        fees?: number | undefined;
    }[];
}>;
export type PositionSchemaType = z.infer<typeof PositionSchema>;
export type PositionCreateRequestSchemaType = z.infer<typeof PositionCreateRequestSchema>;
export type PositionUpdateRequestSchemaType = z.infer<typeof PositionUpdateRequestSchema>;
export type TransactionSchemaType = z.infer<typeof TransactionSchema>;
export type TransactionCreateRequestSchemaType = z.infer<typeof TransactionCreateRequestSchema>;
export type TransactionHistoryItemSchemaType = z.infer<typeof TransactionHistoryItemSchema>;
export type PortfolioSummarySchemaType = z.infer<typeof PortfolioSummarySchema>;
export type MetalBreakdownSchemaType = z.infer<typeof MetalBreakdownSchema>;
export type PositionQueryParamsSchemaType = z.infer<typeof PositionQueryParamsSchema>;
export type TransactionQueryParamsSchemaType = z.infer<typeof TransactionQueryParamsSchema>;
export type PositionsResponseSchemaType = z.infer<typeof PositionsResponseSchema>;
export type TransactionsResponseSchemaType = z.infer<typeof TransactionsResponseSchema>;
//# sourceMappingURL=portfolio-schemas.d.ts.map