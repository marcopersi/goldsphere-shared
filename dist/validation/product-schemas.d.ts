import { z } from 'zod';
export declare const ProductTypeSchema: z.ZodEnum<["coin", "bar", "round"]>;
export declare const MetalTypeSchema: z.ZodEnum<["gold", "silver", "platinum", "palladium"]>;
export declare const WeightUnitSchema: z.ZodEnum<["grams", "troy_ounces", "kilograms"]>;
export declare const SpecificationsSchema: z.ZodObject<{
    diameter: z.ZodOptional<z.ZodNumber>;
    thickness: z.ZodOptional<z.ZodNumber>;
    mintage: z.ZodOptional<z.ZodNumber>;
    certification: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    diameter: z.ZodOptional<z.ZodNumber>;
    thickness: z.ZodOptional<z.ZodNumber>;
    mintage: z.ZodOptional<z.ZodNumber>;
    certification: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    diameter: z.ZodOptional<z.ZodNumber>;
    thickness: z.ZodOptional<z.ZodNumber>;
    mintage: z.ZodOptional<z.ZodNumber>;
    certification: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProductSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<["coin", "bar", "round"]>;
    metal: z.ZodEnum<["gold", "silver", "platinum", "palladium"]>;
    weight: z.ZodNumber;
    weightUnit: z.ZodEnum<["grams", "troy_ounces", "kilograms"]>;
    purity: z.ZodNumber;
    price: z.ZodNumber;
    currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
    producer: z.ZodString;
    country: z.ZodOptional<z.ZodString>;
    year: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    specifications: z.ZodOptional<z.ZodObject<{
        diameter: z.ZodOptional<z.ZodNumber>;
        thickness: z.ZodOptional<z.ZodNumber>;
        mintage: z.ZodOptional<z.ZodNumber>;
        certification: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        diameter: z.ZodOptional<z.ZodNumber>;
        thickness: z.ZodOptional<z.ZodNumber>;
        mintage: z.ZodOptional<z.ZodNumber>;
        certification: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        diameter: z.ZodOptional<z.ZodNumber>;
        thickness: z.ZodOptional<z.ZodNumber>;
        mintage: z.ZodOptional<z.ZodNumber>;
        certification: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>>;
    imageUrl: z.ZodString;
    inStock: z.ZodBoolean;
    stockQuantity: z.ZodOptional<z.ZodNumber>;
    minimumOrderQuantity: z.ZodNumber;
    premiumPercentage: z.ZodOptional<z.ZodNumber>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "coin" | "bar" | "round";
    id: string;
    name: string;
    metal: "gold" | "silver" | "platinum" | "palladium";
    weight: number;
    weightUnit: "grams" | "troy_ounces" | "kilograms";
    purity: number;
    price: number;
    currency: "USD" | "EUR" | "GBP" | "CHF";
    producer: string;
    imageUrl: string;
    inStock: boolean;
    minimumOrderQuantity: number;
    createdAt: string;
    updatedAt: string;
    country?: string | undefined;
    year?: number | undefined;
    description?: string | undefined;
    specifications?: z.objectOutputType<{
        diameter: z.ZodOptional<z.ZodNumber>;
        thickness: z.ZodOptional<z.ZodNumber>;
        mintage: z.ZodOptional<z.ZodNumber>;
        certification: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough"> | undefined;
    stockQuantity?: number | undefined;
    premiumPercentage?: number | undefined;
    tags?: string[] | undefined;
}, {
    type: "coin" | "bar" | "round";
    id: string;
    name: string;
    metal: "gold" | "silver" | "platinum" | "palladium";
    weight: number;
    weightUnit: "grams" | "troy_ounces" | "kilograms";
    purity: number;
    price: number;
    currency: "USD" | "EUR" | "GBP" | "CHF";
    producer: string;
    imageUrl: string;
    inStock: boolean;
    minimumOrderQuantity: number;
    createdAt: string;
    updatedAt: string;
    country?: string | undefined;
    year?: number | undefined;
    description?: string | undefined;
    specifications?: z.objectInputType<{
        diameter: z.ZodOptional<z.ZodNumber>;
        thickness: z.ZodOptional<z.ZodNumber>;
        mintage: z.ZodOptional<z.ZodNumber>;
        certification: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough"> | undefined;
    stockQuantity?: number | undefined;
    premiumPercentage?: number | undefined;
    tags?: string[] | undefined;
}>;
export declare const ProductRegistrationRequestSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<["coin", "bar", "round"]>;
    metal: z.ZodEnum<["gold", "silver", "platinum", "palladium"]>;
    weight: z.ZodNumber;
    weightUnit: z.ZodEnum<["grams", "troy_ounces", "kilograms"]>;
    purity: z.ZodNumber;
    price: z.ZodNumber;
    currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
    producer: z.ZodString;
    country: z.ZodOptional<z.ZodString>;
    year: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    specifications: z.ZodOptional<z.ZodObject<{
        diameter: z.ZodOptional<z.ZodNumber>;
        thickness: z.ZodOptional<z.ZodNumber>;
        mintage: z.ZodOptional<z.ZodNumber>;
        certification: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        diameter: z.ZodOptional<z.ZodNumber>;
        thickness: z.ZodOptional<z.ZodNumber>;
        mintage: z.ZodOptional<z.ZodNumber>;
        certification: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        diameter: z.ZodOptional<z.ZodNumber>;
        thickness: z.ZodOptional<z.ZodNumber>;
        mintage: z.ZodOptional<z.ZodNumber>;
        certification: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>>;
    inStock: z.ZodDefault<z.ZodBoolean>;
    stockQuantity: z.ZodOptional<z.ZodNumber>;
    minimumOrderQuantity: z.ZodDefault<z.ZodNumber>;
    premiumPercentage: z.ZodOptional<z.ZodNumber>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    type: "coin" | "bar" | "round";
    name: string;
    metal: "gold" | "silver" | "platinum" | "palladium";
    weight: number;
    weightUnit: "grams" | "troy_ounces" | "kilograms";
    purity: number;
    price: number;
    currency: "USD" | "EUR" | "GBP" | "CHF";
    producer: string;
    inStock: boolean;
    minimumOrderQuantity: number;
    country?: string | undefined;
    year?: number | undefined;
    description?: string | undefined;
    specifications?: z.objectOutputType<{
        diameter: z.ZodOptional<z.ZodNumber>;
        thickness: z.ZodOptional<z.ZodNumber>;
        mintage: z.ZodOptional<z.ZodNumber>;
        certification: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough"> | undefined;
    stockQuantity?: number | undefined;
    premiumPercentage?: number | undefined;
    tags?: string[] | undefined;
}, {
    type: "coin" | "bar" | "round";
    name: string;
    metal: "gold" | "silver" | "platinum" | "palladium";
    weight: number;
    weightUnit: "grams" | "troy_ounces" | "kilograms";
    purity: number;
    price: number;
    currency: "USD" | "EUR" | "GBP" | "CHF";
    producer: string;
    country?: string | undefined;
    year?: number | undefined;
    description?: string | undefined;
    specifications?: z.objectInputType<{
        diameter: z.ZodOptional<z.ZodNumber>;
        thickness: z.ZodOptional<z.ZodNumber>;
        mintage: z.ZodOptional<z.ZodNumber>;
        certification: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough"> | undefined;
    inStock?: boolean | undefined;
    stockQuantity?: number | undefined;
    minimumOrderQuantity?: number | undefined;
    premiumPercentage?: number | undefined;
    tags?: string[] | undefined;
}>;
export declare const ProductUpdateRequestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    specifications: z.ZodOptional<z.ZodObject<{
        diameter: z.ZodOptional<z.ZodNumber>;
        thickness: z.ZodOptional<z.ZodNumber>;
        mintage: z.ZodOptional<z.ZodNumber>;
        certification: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        diameter: z.ZodOptional<z.ZodNumber>;
        thickness: z.ZodOptional<z.ZodNumber>;
        mintage: z.ZodOptional<z.ZodNumber>;
        certification: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        diameter: z.ZodOptional<z.ZodNumber>;
        thickness: z.ZodOptional<z.ZodNumber>;
        mintage: z.ZodOptional<z.ZodNumber>;
        certification: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>>;
    inStock: z.ZodOptional<z.ZodBoolean>;
    stockQuantity: z.ZodOptional<z.ZodNumber>;
    minimumOrderQuantity: z.ZodOptional<z.ZodNumber>;
    premiumPercentage: z.ZodOptional<z.ZodNumber>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    price?: number | undefined;
    description?: string | undefined;
    specifications?: z.objectOutputType<{
        diameter: z.ZodOptional<z.ZodNumber>;
        thickness: z.ZodOptional<z.ZodNumber>;
        mintage: z.ZodOptional<z.ZodNumber>;
        certification: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough"> | undefined;
    inStock?: boolean | undefined;
    stockQuantity?: number | undefined;
    minimumOrderQuantity?: number | undefined;
    premiumPercentage?: number | undefined;
    tags?: string[] | undefined;
}, {
    name?: string | undefined;
    price?: number | undefined;
    description?: string | undefined;
    specifications?: z.objectInputType<{
        diameter: z.ZodOptional<z.ZodNumber>;
        thickness: z.ZodOptional<z.ZodNumber>;
        mintage: z.ZodOptional<z.ZodNumber>;
        certification: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough"> | undefined;
    inStock?: boolean | undefined;
    stockQuantity?: number | undefined;
    minimumOrderQuantity?: number | undefined;
    premiumPercentage?: number | undefined;
    tags?: string[] | undefined;
}>;
export declare const ProductQueryParamsSchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    metal: z.ZodOptional<z.ZodEnum<["gold", "silver", "platinum", "palladium"]>>;
    type: z.ZodOptional<z.ZodEnum<["coin", "bar", "round"]>>;
    producer: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: "coin" | "bar" | "round" | undefined;
    metal?: "gold" | "silver" | "platinum" | "palladium" | undefined;
    producer?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}, {
    type?: "coin" | "bar" | "round" | undefined;
    metal?: "gold" | "silver" | "platinum" | "palladium" | undefined;
    producer?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare const PaginationSchema: z.ZodObject<{
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
export declare const ProductsResponseSchema: z.ZodObject<{
    products: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["coin", "bar", "round"]>;
        metal: z.ZodEnum<["gold", "silver", "platinum", "palladium"]>;
        weight: z.ZodNumber;
        weightUnit: z.ZodEnum<["grams", "troy_ounces", "kilograms"]>;
        purity: z.ZodNumber;
        price: z.ZodNumber;
        currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
        producer: z.ZodString;
        country: z.ZodOptional<z.ZodString>;
        year: z.ZodOptional<z.ZodNumber>;
        description: z.ZodOptional<z.ZodString>;
        specifications: z.ZodOptional<z.ZodObject<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>>;
        imageUrl: z.ZodString;
        inStock: z.ZodBoolean;
        stockQuantity: z.ZodOptional<z.ZodNumber>;
        minimumOrderQuantity: z.ZodNumber;
        premiumPercentage: z.ZodOptional<z.ZodNumber>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "coin" | "bar" | "round";
        id: string;
        name: string;
        metal: "gold" | "silver" | "platinum" | "palladium";
        weight: number;
        weightUnit: "grams" | "troy_ounces" | "kilograms";
        purity: number;
        price: number;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        producer: string;
        imageUrl: string;
        inStock: boolean;
        minimumOrderQuantity: number;
        createdAt: string;
        updatedAt: string;
        country?: string | undefined;
        year?: number | undefined;
        description?: string | undefined;
        specifications?: z.objectOutputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        stockQuantity?: number | undefined;
        premiumPercentage?: number | undefined;
        tags?: string[] | undefined;
    }, {
        type: "coin" | "bar" | "round";
        id: string;
        name: string;
        metal: "gold" | "silver" | "platinum" | "palladium";
        weight: number;
        weightUnit: "grams" | "troy_ounces" | "kilograms";
        purity: number;
        price: number;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        producer: string;
        imageUrl: string;
        inStock: boolean;
        minimumOrderQuantity: number;
        createdAt: string;
        updatedAt: string;
        country?: string | undefined;
        year?: number | undefined;
        description?: string | undefined;
        specifications?: z.objectInputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        stockQuantity?: number | undefined;
        premiumPercentage?: number | undefined;
        tags?: string[] | undefined;
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
    products: {
        type: "coin" | "bar" | "round";
        id: string;
        name: string;
        metal: "gold" | "silver" | "platinum" | "palladium";
        weight: number;
        weightUnit: "grams" | "troy_ounces" | "kilograms";
        purity: number;
        price: number;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        producer: string;
        imageUrl: string;
        inStock: boolean;
        minimumOrderQuantity: number;
        createdAt: string;
        updatedAt: string;
        country?: string | undefined;
        year?: number | undefined;
        description?: string | undefined;
        specifications?: z.objectOutputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        stockQuantity?: number | undefined;
        premiumPercentage?: number | undefined;
        tags?: string[] | undefined;
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}, {
    products: {
        type: "coin" | "bar" | "round";
        id: string;
        name: string;
        metal: "gold" | "silver" | "platinum" | "palladium";
        weight: number;
        weightUnit: "grams" | "troy_ounces" | "kilograms";
        purity: number;
        price: number;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        producer: string;
        imageUrl: string;
        inStock: boolean;
        minimumOrderQuantity: number;
        createdAt: string;
        updatedAt: string;
        country?: string | undefined;
        year?: number | undefined;
        description?: string | undefined;
        specifications?: z.objectInputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        stockQuantity?: number | undefined;
        premiumPercentage?: number | undefined;
        tags?: string[] | undefined;
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}>;
export declare const BulkRegistrationRequestSchema: z.ZodObject<{
    products: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<["coin", "bar", "round"]>;
        metal: z.ZodEnum<["gold", "silver", "platinum", "palladium"]>;
        weight: z.ZodNumber;
        weightUnit: z.ZodEnum<["grams", "troy_ounces", "kilograms"]>;
        purity: z.ZodNumber;
        price: z.ZodNumber;
        currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
        producer: z.ZodString;
        country: z.ZodOptional<z.ZodString>;
        year: z.ZodOptional<z.ZodNumber>;
        description: z.ZodOptional<z.ZodString>;
        specifications: z.ZodOptional<z.ZodObject<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>>;
        inStock: z.ZodDefault<z.ZodBoolean>;
        stockQuantity: z.ZodOptional<z.ZodNumber>;
        minimumOrderQuantity: z.ZodDefault<z.ZodNumber>;
        premiumPercentage: z.ZodOptional<z.ZodNumber>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "coin" | "bar" | "round";
        name: string;
        metal: "gold" | "silver" | "platinum" | "palladium";
        weight: number;
        weightUnit: "grams" | "troy_ounces" | "kilograms";
        purity: number;
        price: number;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        producer: string;
        inStock: boolean;
        minimumOrderQuantity: number;
        country?: string | undefined;
        year?: number | undefined;
        description?: string | undefined;
        specifications?: z.objectOutputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        stockQuantity?: number | undefined;
        premiumPercentage?: number | undefined;
        tags?: string[] | undefined;
    }, {
        type: "coin" | "bar" | "round";
        name: string;
        metal: "gold" | "silver" | "platinum" | "palladium";
        weight: number;
        weightUnit: "grams" | "troy_ounces" | "kilograms";
        purity: number;
        price: number;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        producer: string;
        country?: string | undefined;
        year?: number | undefined;
        description?: string | undefined;
        specifications?: z.objectInputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        inStock?: boolean | undefined;
        stockQuantity?: number | undefined;
        minimumOrderQuantity?: number | undefined;
        premiumPercentage?: number | undefined;
        tags?: string[] | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    products: {
        type: "coin" | "bar" | "round";
        name: string;
        metal: "gold" | "silver" | "platinum" | "palladium";
        weight: number;
        weightUnit: "grams" | "troy_ounces" | "kilograms";
        purity: number;
        price: number;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        producer: string;
        inStock: boolean;
        minimumOrderQuantity: number;
        country?: string | undefined;
        year?: number | undefined;
        description?: string | undefined;
        specifications?: z.objectOutputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        stockQuantity?: number | undefined;
        premiumPercentage?: number | undefined;
        tags?: string[] | undefined;
    }[];
}, {
    products: {
        type: "coin" | "bar" | "round";
        name: string;
        metal: "gold" | "silver" | "platinum" | "palladium";
        weight: number;
        weightUnit: "grams" | "troy_ounces" | "kilograms";
        purity: number;
        price: number;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        producer: string;
        country?: string | undefined;
        year?: number | undefined;
        description?: string | undefined;
        specifications?: z.objectInputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        inStock?: boolean | undefined;
        stockQuantity?: number | undefined;
        minimumOrderQuantity?: number | undefined;
        premiumPercentage?: number | undefined;
        tags?: string[] | undefined;
    }[];
}>;
export declare const BulkRegistrationResultSchema: z.ZodObject<{
    product: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["coin", "bar", "round"]>;
        metal: z.ZodEnum<["gold", "silver", "platinum", "palladium"]>;
        weight: z.ZodNumber;
        weightUnit: z.ZodEnum<["grams", "troy_ounces", "kilograms"]>;
        purity: z.ZodNumber;
        price: z.ZodNumber;
        currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
        producer: z.ZodString;
        country: z.ZodOptional<z.ZodString>;
        year: z.ZodOptional<z.ZodNumber>;
        description: z.ZodOptional<z.ZodString>;
        specifications: z.ZodOptional<z.ZodObject<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>>;
        imageUrl: z.ZodString;
        inStock: z.ZodBoolean;
        stockQuantity: z.ZodOptional<z.ZodNumber>;
        minimumOrderQuantity: z.ZodNumber;
        premiumPercentage: z.ZodOptional<z.ZodNumber>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "coin" | "bar" | "round";
        id: string;
        name: string;
        metal: "gold" | "silver" | "platinum" | "palladium";
        weight: number;
        weightUnit: "grams" | "troy_ounces" | "kilograms";
        purity: number;
        price: number;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        producer: string;
        imageUrl: string;
        inStock: boolean;
        minimumOrderQuantity: number;
        createdAt: string;
        updatedAt: string;
        country?: string | undefined;
        year?: number | undefined;
        description?: string | undefined;
        specifications?: z.objectOutputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        stockQuantity?: number | undefined;
        premiumPercentage?: number | undefined;
        tags?: string[] | undefined;
    }, {
        type: "coin" | "bar" | "round";
        id: string;
        name: string;
        metal: "gold" | "silver" | "platinum" | "palladium";
        weight: number;
        weightUnit: "grams" | "troy_ounces" | "kilograms";
        purity: number;
        price: number;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        producer: string;
        imageUrl: string;
        inStock: boolean;
        minimumOrderQuantity: number;
        createdAt: string;
        updatedAt: string;
        country?: string | undefined;
        year?: number | undefined;
        description?: string | undefined;
        specifications?: z.objectInputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        stockQuantity?: number | undefined;
        premiumPercentage?: number | undefined;
        tags?: string[] | undefined;
    }>>;
    status: z.ZodEnum<["success", "error"]>;
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "success" | "error";
    error?: string | undefined;
    product?: {
        type: "coin" | "bar" | "round";
        id: string;
        name: string;
        metal: "gold" | "silver" | "platinum" | "palladium";
        weight: number;
        weightUnit: "grams" | "troy_ounces" | "kilograms";
        purity: number;
        price: number;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        producer: string;
        imageUrl: string;
        inStock: boolean;
        minimumOrderQuantity: number;
        createdAt: string;
        updatedAt: string;
        country?: string | undefined;
        year?: number | undefined;
        description?: string | undefined;
        specifications?: z.objectOutputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        stockQuantity?: number | undefined;
        premiumPercentage?: number | undefined;
        tags?: string[] | undefined;
    } | undefined;
}, {
    status: "success" | "error";
    error?: string | undefined;
    product?: {
        type: "coin" | "bar" | "round";
        id: string;
        name: string;
        metal: "gold" | "silver" | "platinum" | "palladium";
        weight: number;
        weightUnit: "grams" | "troy_ounces" | "kilograms";
        purity: number;
        price: number;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        producer: string;
        imageUrl: string;
        inStock: boolean;
        minimumOrderQuantity: number;
        createdAt: string;
        updatedAt: string;
        country?: string | undefined;
        year?: number | undefined;
        description?: string | undefined;
        specifications?: z.objectInputType<{
            diameter: z.ZodOptional<z.ZodNumber>;
            thickness: z.ZodOptional<z.ZodNumber>;
            mintage: z.ZodOptional<z.ZodNumber>;
            certification: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        stockQuantity?: number | undefined;
        premiumPercentage?: number | undefined;
        tags?: string[] | undefined;
    } | undefined;
}>;
export declare const BulkRegistrationResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    results: z.ZodArray<z.ZodObject<{
        product: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            type: z.ZodEnum<["coin", "bar", "round"]>;
            metal: z.ZodEnum<["gold", "silver", "platinum", "palladium"]>;
            weight: z.ZodNumber;
            weightUnit: z.ZodEnum<["grams", "troy_ounces", "kilograms"]>;
            purity: z.ZodNumber;
            price: z.ZodNumber;
            currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
            producer: z.ZodString;
            country: z.ZodOptional<z.ZodString>;
            year: z.ZodOptional<z.ZodNumber>;
            description: z.ZodOptional<z.ZodString>;
            specifications: z.ZodOptional<z.ZodObject<{
                diameter: z.ZodOptional<z.ZodNumber>;
                thickness: z.ZodOptional<z.ZodNumber>;
                mintage: z.ZodOptional<z.ZodNumber>;
                certification: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                diameter: z.ZodOptional<z.ZodNumber>;
                thickness: z.ZodOptional<z.ZodNumber>;
                mintage: z.ZodOptional<z.ZodNumber>;
                certification: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                diameter: z.ZodOptional<z.ZodNumber>;
                thickness: z.ZodOptional<z.ZodNumber>;
                mintage: z.ZodOptional<z.ZodNumber>;
                certification: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>>;
            imageUrl: z.ZodString;
            inStock: z.ZodBoolean;
            stockQuantity: z.ZodOptional<z.ZodNumber>;
            minimumOrderQuantity: z.ZodNumber;
            premiumPercentage: z.ZodOptional<z.ZodNumber>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "coin" | "bar" | "round";
            id: string;
            name: string;
            metal: "gold" | "silver" | "platinum" | "palladium";
            weight: number;
            weightUnit: "grams" | "troy_ounces" | "kilograms";
            purity: number;
            price: number;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            producer: string;
            imageUrl: string;
            inStock: boolean;
            minimumOrderQuantity: number;
            createdAt: string;
            updatedAt: string;
            country?: string | undefined;
            year?: number | undefined;
            description?: string | undefined;
            specifications?: z.objectOutputType<{
                diameter: z.ZodOptional<z.ZodNumber>;
                thickness: z.ZodOptional<z.ZodNumber>;
                mintage: z.ZodOptional<z.ZodNumber>;
                certification: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough"> | undefined;
            stockQuantity?: number | undefined;
            premiumPercentage?: number | undefined;
            tags?: string[] | undefined;
        }, {
            type: "coin" | "bar" | "round";
            id: string;
            name: string;
            metal: "gold" | "silver" | "platinum" | "palladium";
            weight: number;
            weightUnit: "grams" | "troy_ounces" | "kilograms";
            purity: number;
            price: number;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            producer: string;
            imageUrl: string;
            inStock: boolean;
            minimumOrderQuantity: number;
            createdAt: string;
            updatedAt: string;
            country?: string | undefined;
            year?: number | undefined;
            description?: string | undefined;
            specifications?: z.objectInputType<{
                diameter: z.ZodOptional<z.ZodNumber>;
                thickness: z.ZodOptional<z.ZodNumber>;
                mintage: z.ZodOptional<z.ZodNumber>;
                certification: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough"> | undefined;
            stockQuantity?: number | undefined;
            premiumPercentage?: number | undefined;
            tags?: string[] | undefined;
        }>>;
        status: z.ZodEnum<["success", "error"]>;
        error: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "success" | "error";
        error?: string | undefined;
        product?: {
            type: "coin" | "bar" | "round";
            id: string;
            name: string;
            metal: "gold" | "silver" | "platinum" | "palladium";
            weight: number;
            weightUnit: "grams" | "troy_ounces" | "kilograms";
            purity: number;
            price: number;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            producer: string;
            imageUrl: string;
            inStock: boolean;
            minimumOrderQuantity: number;
            createdAt: string;
            updatedAt: string;
            country?: string | undefined;
            year?: number | undefined;
            description?: string | undefined;
            specifications?: z.objectOutputType<{
                diameter: z.ZodOptional<z.ZodNumber>;
                thickness: z.ZodOptional<z.ZodNumber>;
                mintage: z.ZodOptional<z.ZodNumber>;
                certification: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough"> | undefined;
            stockQuantity?: number | undefined;
            premiumPercentage?: number | undefined;
            tags?: string[] | undefined;
        } | undefined;
    }, {
        status: "success" | "error";
        error?: string | undefined;
        product?: {
            type: "coin" | "bar" | "round";
            id: string;
            name: string;
            metal: "gold" | "silver" | "platinum" | "palladium";
            weight: number;
            weightUnit: "grams" | "troy_ounces" | "kilograms";
            purity: number;
            price: number;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            producer: string;
            imageUrl: string;
            inStock: boolean;
            minimumOrderQuantity: number;
            createdAt: string;
            updatedAt: string;
            country?: string | undefined;
            year?: number | undefined;
            description?: string | undefined;
            specifications?: z.objectInputType<{
                diameter: z.ZodOptional<z.ZodNumber>;
                thickness: z.ZodOptional<z.ZodNumber>;
                mintage: z.ZodOptional<z.ZodNumber>;
                certification: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough"> | undefined;
            stockQuantity?: number | undefined;
            premiumPercentage?: number | undefined;
            tags?: string[] | undefined;
        } | undefined;
    }>, "many">;
    summary: z.ZodObject<{
        total: z.ZodNumber;
        successful: z.ZodNumber;
        failed: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        failed: number;
        total: number;
        successful: number;
    }, {
        failed: number;
        total: number;
        successful: number;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    results: {
        status: "success" | "error";
        error?: string | undefined;
        product?: {
            type: "coin" | "bar" | "round";
            id: string;
            name: string;
            metal: "gold" | "silver" | "platinum" | "palladium";
            weight: number;
            weightUnit: "grams" | "troy_ounces" | "kilograms";
            purity: number;
            price: number;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            producer: string;
            imageUrl: string;
            inStock: boolean;
            minimumOrderQuantity: number;
            createdAt: string;
            updatedAt: string;
            country?: string | undefined;
            year?: number | undefined;
            description?: string | undefined;
            specifications?: z.objectOutputType<{
                diameter: z.ZodOptional<z.ZodNumber>;
                thickness: z.ZodOptional<z.ZodNumber>;
                mintage: z.ZodOptional<z.ZodNumber>;
                certification: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough"> | undefined;
            stockQuantity?: number | undefined;
            premiumPercentage?: number | undefined;
            tags?: string[] | undefined;
        } | undefined;
    }[];
    summary: {
        failed: number;
        total: number;
        successful: number;
    };
}, {
    success: boolean;
    results: {
        status: "success" | "error";
        error?: string | undefined;
        product?: {
            type: "coin" | "bar" | "round";
            id: string;
            name: string;
            metal: "gold" | "silver" | "platinum" | "palladium";
            weight: number;
            weightUnit: "grams" | "troy_ounces" | "kilograms";
            purity: number;
            price: number;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            producer: string;
            imageUrl: string;
            inStock: boolean;
            minimumOrderQuantity: number;
            createdAt: string;
            updatedAt: string;
            country?: string | undefined;
            year?: number | undefined;
            description?: string | undefined;
            specifications?: z.objectInputType<{
                diameter: z.ZodOptional<z.ZodNumber>;
                thickness: z.ZodOptional<z.ZodNumber>;
                mintage: z.ZodOptional<z.ZodNumber>;
                certification: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough"> | undefined;
            stockQuantity?: number | undefined;
            premiumPercentage?: number | undefined;
            tags?: string[] | undefined;
        } | undefined;
    }[];
    summary: {
        failed: number;
        total: number;
        successful: number;
    };
}>;
export declare const ApiErrorDetailSchema: z.ZodObject<{
    field: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    field: string;
}, {
    message: string;
    field: string;
}>;
export declare const ApiErrorSchema: z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodArray<z.ZodObject<{
            field: z.ZodString;
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
            field: string;
        }, {
            message: string;
            field: string;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        details?: {
            message: string;
            field: string;
        }[] | undefined;
    }, {
        code: string;
        message: string;
        details?: {
            message: string;
            field: string;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    success: false;
    error: {
        code: string;
        message: string;
        details?: {
            message: string;
            field: string;
        }[] | undefined;
    };
}, {
    success: false;
    error: {
        code: string;
        message: string;
        details?: {
            message: string;
            field: string;
        }[] | undefined;
    };
}>;
export declare const ApiSuccessSchema: z.ZodObject<{
    success: z.ZodLiteral<true>;
    data: z.ZodOptional<z.ZodAny>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: true;
    message?: string | undefined;
    data?: any;
}, {
    success: true;
    message?: string | undefined;
    data?: any;
}>;
export type ProductSchemaType = z.infer<typeof ProductSchema>;
export type ProductRegistrationRequestSchemaType = z.infer<typeof ProductRegistrationRequestSchema>;
export type ProductUpdateRequestSchemaType = z.infer<typeof ProductUpdateRequestSchema>;
export type ProductQueryParamsSchemaType = z.infer<typeof ProductQueryParamsSchema>;
export type ProductsResponseSchemaType = z.infer<typeof ProductsResponseSchema>;
export type BulkRegistrationRequestSchemaType = z.infer<typeof BulkRegistrationRequestSchema>;
export type BulkRegistrationResponseSchemaType = z.infer<typeof BulkRegistrationResponseSchema>;
export type ApiErrorSchemaType = z.infer<typeof ApiErrorSchema>;
export type ApiSuccessSchemaType = z.infer<typeof ApiSuccessSchema>;
//# sourceMappingURL=product-schemas.d.ts.map