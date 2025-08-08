import { z } from 'zod';
export declare const PaymentMethodTypeSchema: z.ZodEnum<["card", "bank_transfer", "sepa_debit"]>;
export declare const PaymentIntentStatusSchema: z.ZodEnum<["requires_payment_method", "requires_confirmation", "requires_action", "processing", "succeeded", "canceled", "requires_capture"]>;
export declare const PaymentErrorTypeSchema: z.ZodEnum<["card_error", "validation_error", "api_error", "authentication_error"]>;
export declare const PaymentMethodSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["card", "bank_transfer", "sepa_debit"]>;
    isDefault: z.ZodOptional<z.ZodBoolean>;
    last4: z.ZodOptional<z.ZodString>;
    brand: z.ZodOptional<z.ZodString>;
    expiryMonth: z.ZodOptional<z.ZodNumber>;
    expiryYear: z.ZodOptional<z.ZodNumber>;
    bankName: z.ZodOptional<z.ZodString>;
    accountLast4: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "card" | "bank_transfer" | "sepa_debit";
    id: string;
    createdAt: string;
    updatedAt: string;
    isDefault?: boolean | undefined;
    last4?: string | undefined;
    brand?: string | undefined;
    expiryMonth?: number | undefined;
    expiryYear?: number | undefined;
    bankName?: string | undefined;
    accountLast4?: string | undefined;
}, {
    type: "card" | "bank_transfer" | "sepa_debit";
    id: string;
    createdAt: string;
    updatedAt: string;
    isDefault?: boolean | undefined;
    last4?: string | undefined;
    brand?: string | undefined;
    expiryMonth?: number | undefined;
    expiryYear?: number | undefined;
    bankName?: string | undefined;
    accountLast4?: string | undefined;
}>, {
    type: "card" | "bank_transfer" | "sepa_debit";
    id: string;
    createdAt: string;
    updatedAt: string;
    isDefault?: boolean | undefined;
    last4?: string | undefined;
    brand?: string | undefined;
    expiryMonth?: number | undefined;
    expiryYear?: number | undefined;
    bankName?: string | undefined;
    accountLast4?: string | undefined;
}, {
    type: "card" | "bank_transfer" | "sepa_debit";
    id: string;
    createdAt: string;
    updatedAt: string;
    isDefault?: boolean | undefined;
    last4?: string | undefined;
    brand?: string | undefined;
    expiryMonth?: number | undefined;
    expiryYear?: number | undefined;
    bankName?: string | undefined;
    accountLast4?: string | undefined;
}>;
export declare const PaymentIntentSchema: z.ZodObject<{
    id: z.ZodString;
    clientSecret: z.ZodString;
    amount: z.ZodNumber;
    currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
    status: z.ZodEnum<["requires_payment_method", "requires_confirmation", "requires_action", "processing", "succeeded", "canceled", "requires_capture"]>;
    orderId: z.ZodOptional<z.ZodString>;
    customerId: z.ZodOptional<z.ZodString>;
    paymentMethodId: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    amountReceived: z.ZodOptional<z.ZodNumber>;
    fees: z.ZodOptional<z.ZodNumber>;
    refunded: z.ZodOptional<z.ZodBoolean>;
    refundedAmount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
    id: string;
    currency: "USD" | "EUR" | "GBP" | "CHF";
    createdAt: string;
    updatedAt: string;
    clientSecret: string;
    amount: number;
    fees?: number | undefined;
    orderId?: string | undefined;
    customerId?: string | undefined;
    paymentMethodId?: string | undefined;
    metadata?: Record<string, string> | undefined;
    amountReceived?: number | undefined;
    refunded?: boolean | undefined;
    refundedAmount?: number | undefined;
}, {
    status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
    id: string;
    currency: "USD" | "EUR" | "GBP" | "CHF";
    createdAt: string;
    updatedAt: string;
    clientSecret: string;
    amount: number;
    fees?: number | undefined;
    orderId?: string | undefined;
    customerId?: string | undefined;
    paymentMethodId?: string | undefined;
    metadata?: Record<string, string> | undefined;
    amountReceived?: number | undefined;
    refunded?: boolean | undefined;
    refundedAmount?: number | undefined;
}>;
export declare const PaymentErrorSchema: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
    type: z.ZodEnum<["card_error", "validation_error", "api_error", "authentication_error"]>;
    param: z.ZodOptional<z.ZodString>;
    declineCode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    type: "validation_error" | "card_error" | "api_error" | "authentication_error";
    param?: string | undefined;
    declineCode?: string | undefined;
}, {
    code: string;
    message: string;
    type: "validation_error" | "card_error" | "api_error" | "authentication_error";
    param?: string | undefined;
    declineCode?: string | undefined;
}>;
export declare const CreatePaymentIntentRequestSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
    orderId: z.ZodString;
    customerId: z.ZodOptional<z.ZodString>;
    paymentMethodId: z.ZodOptional<z.ZodString>;
    automaticPaymentMethods: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodBoolean;
        allowRedirects: z.ZodOptional<z.ZodEnum<["always", "never"]>>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        allowRedirects?: "always" | "never" | undefined;
    }, {
        enabled: boolean;
        allowRedirects?: "always" | "never" | undefined;
    }>>;
    description: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    currency: "USD" | "EUR" | "GBP" | "CHF";
    amount: number;
    orderId: string;
    description?: string | undefined;
    customerId?: string | undefined;
    paymentMethodId?: string | undefined;
    metadata?: Record<string, string> | undefined;
    automaticPaymentMethods?: {
        enabled: boolean;
        allowRedirects?: "always" | "never" | undefined;
    } | undefined;
}, {
    currency: "USD" | "EUR" | "GBP" | "CHF";
    amount: number;
    orderId: string;
    description?: string | undefined;
    customerId?: string | undefined;
    paymentMethodId?: string | undefined;
    metadata?: Record<string, string> | undefined;
    automaticPaymentMethods?: {
        enabled: boolean;
        allowRedirects?: "always" | "never" | undefined;
    } | undefined;
}>;
export declare const ConfirmPaymentRequestSchema: z.ZodObject<{
    paymentIntentId: z.ZodString;
    paymentMethodId: z.ZodOptional<z.ZodString>;
    returnUrl: z.ZodOptional<z.ZodString>;
    useStripeSdk: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    paymentIntentId: string;
    paymentMethodId?: string | undefined;
    returnUrl?: string | undefined;
    useStripeSdk?: boolean | undefined;
}, {
    paymentIntentId: string;
    paymentMethodId?: string | undefined;
    returnUrl?: string | undefined;
    useStripeSdk?: boolean | undefined;
}>;
export declare const ListPaymentMethodsRequestSchema: z.ZodObject<{
    customerId: z.ZodString;
    type: z.ZodOptional<z.ZodEnum<["card", "bank_transfer", "sepa_debit"]>>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    customerId: string;
    type?: "card" | "bank_transfer" | "sepa_debit" | undefined;
}, {
    customerId: string;
    type?: "card" | "bank_transfer" | "sepa_debit" | undefined;
    limit?: number | undefined;
}>;
export declare const RefundRequestSchema: z.ZodObject<{
    paymentIntentId: z.ZodString;
    amount: z.ZodOptional<z.ZodNumber>;
    reason: z.ZodOptional<z.ZodEnum<["duplicate", "fraudulent", "requested_by_customer"]>>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    paymentIntentId: string;
    amount?: number | undefined;
    metadata?: Record<string, string> | undefined;
    reason?: "duplicate" | "fraudulent" | "requested_by_customer" | undefined;
}, {
    paymentIntentId: string;
    amount?: number | undefined;
    metadata?: Record<string, string> | undefined;
    reason?: "duplicate" | "fraudulent" | "requested_by_customer" | undefined;
}>;
export declare const CreatePaymentIntentResponseSchema: z.ZodEffects<z.ZodObject<{
    success: z.ZodBoolean;
    paymentIntent: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        clientSecret: z.ZodString;
        amount: z.ZodNumber;
        currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
        status: z.ZodEnum<["requires_payment_method", "requires_confirmation", "requires_action", "processing", "succeeded", "canceled", "requires_capture"]>;
        orderId: z.ZodOptional<z.ZodString>;
        customerId: z.ZodOptional<z.ZodString>;
        paymentMethodId: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        amountReceived: z.ZodOptional<z.ZodNumber>;
        fees: z.ZodOptional<z.ZodNumber>;
        refunded: z.ZodOptional<z.ZodBoolean>;
        refundedAmount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        updatedAt: string;
        clientSecret: string;
        amount: number;
        fees?: number | undefined;
        orderId?: string | undefined;
        customerId?: string | undefined;
        paymentMethodId?: string | undefined;
        metadata?: Record<string, string> | undefined;
        amountReceived?: number | undefined;
        refunded?: boolean | undefined;
        refundedAmount?: number | undefined;
    }, {
        status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        updatedAt: string;
        clientSecret: string;
        amount: number;
        fees?: number | undefined;
        orderId?: string | undefined;
        customerId?: string | undefined;
        paymentMethodId?: string | undefined;
        metadata?: Record<string, string> | undefined;
        amountReceived?: number | undefined;
        refunded?: boolean | undefined;
        refundedAmount?: number | undefined;
    }>>;
    error: z.ZodOptional<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        type: z.ZodEnum<["card_error", "validation_error", "api_error", "authentication_error"]>;
        param: z.ZodOptional<z.ZodString>;
        declineCode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    }, {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    error?: {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    } | undefined;
    paymentIntent?: {
        status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        updatedAt: string;
        clientSecret: string;
        amount: number;
        fees?: number | undefined;
        orderId?: string | undefined;
        customerId?: string | undefined;
        paymentMethodId?: string | undefined;
        metadata?: Record<string, string> | undefined;
        amountReceived?: number | undefined;
        refunded?: boolean | undefined;
        refundedAmount?: number | undefined;
    } | undefined;
}, {
    success: boolean;
    error?: {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    } | undefined;
    paymentIntent?: {
        status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        updatedAt: string;
        clientSecret: string;
        amount: number;
        fees?: number | undefined;
        orderId?: string | undefined;
        customerId?: string | undefined;
        paymentMethodId?: string | undefined;
        metadata?: Record<string, string> | undefined;
        amountReceived?: number | undefined;
        refunded?: boolean | undefined;
        refundedAmount?: number | undefined;
    } | undefined;
}>, {
    success: boolean;
    error?: {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    } | undefined;
    paymentIntent?: {
        status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        updatedAt: string;
        clientSecret: string;
        amount: number;
        fees?: number | undefined;
        orderId?: string | undefined;
        customerId?: string | undefined;
        paymentMethodId?: string | undefined;
        metadata?: Record<string, string> | undefined;
        amountReceived?: number | undefined;
        refunded?: boolean | undefined;
        refundedAmount?: number | undefined;
    } | undefined;
}, {
    success: boolean;
    error?: {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    } | undefined;
    paymentIntent?: {
        status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        updatedAt: string;
        clientSecret: string;
        amount: number;
        fees?: number | undefined;
        orderId?: string | undefined;
        customerId?: string | undefined;
        paymentMethodId?: string | undefined;
        metadata?: Record<string, string> | undefined;
        amountReceived?: number | undefined;
        refunded?: boolean | undefined;
        refundedAmount?: number | undefined;
    } | undefined;
}>;
export declare const ConfirmPaymentResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    paymentIntent: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        clientSecret: z.ZodString;
        amount: z.ZodNumber;
        currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
        status: z.ZodEnum<["requires_payment_method", "requires_confirmation", "requires_action", "processing", "succeeded", "canceled", "requires_capture"]>;
        orderId: z.ZodOptional<z.ZodString>;
        customerId: z.ZodOptional<z.ZodString>;
        paymentMethodId: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        amountReceived: z.ZodOptional<z.ZodNumber>;
        fees: z.ZodOptional<z.ZodNumber>;
        refunded: z.ZodOptional<z.ZodBoolean>;
        refundedAmount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        updatedAt: string;
        clientSecret: string;
        amount: number;
        fees?: number | undefined;
        orderId?: string | undefined;
        customerId?: string | undefined;
        paymentMethodId?: string | undefined;
        metadata?: Record<string, string> | undefined;
        amountReceived?: number | undefined;
        refunded?: boolean | undefined;
        refundedAmount?: number | undefined;
    }, {
        status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        updatedAt: string;
        clientSecret: string;
        amount: number;
        fees?: number | undefined;
        orderId?: string | undefined;
        customerId?: string | undefined;
        paymentMethodId?: string | undefined;
        metadata?: Record<string, string> | undefined;
        amountReceived?: number | undefined;
        refunded?: boolean | undefined;
        refundedAmount?: number | undefined;
    }>>;
    error: z.ZodOptional<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        type: z.ZodEnum<["card_error", "validation_error", "api_error", "authentication_error"]>;
        param: z.ZodOptional<z.ZodString>;
        declineCode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    }, {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    }>>;
    requiresAction: z.ZodOptional<z.ZodBoolean>;
    nextAction: z.ZodOptional<z.ZodObject<{
        type: z.ZodString;
        redirectToUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        redirectToUrl?: string | undefined;
    }, {
        type: string;
        redirectToUrl?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    error?: {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    } | undefined;
    paymentIntent?: {
        status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        updatedAt: string;
        clientSecret: string;
        amount: number;
        fees?: number | undefined;
        orderId?: string | undefined;
        customerId?: string | undefined;
        paymentMethodId?: string | undefined;
        metadata?: Record<string, string> | undefined;
        amountReceived?: number | undefined;
        refunded?: boolean | undefined;
        refundedAmount?: number | undefined;
    } | undefined;
    requiresAction?: boolean | undefined;
    nextAction?: {
        type: string;
        redirectToUrl?: string | undefined;
    } | undefined;
}, {
    success: boolean;
    error?: {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    } | undefined;
    paymentIntent?: {
        status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        updatedAt: string;
        clientSecret: string;
        amount: number;
        fees?: number | undefined;
        orderId?: string | undefined;
        customerId?: string | undefined;
        paymentMethodId?: string | undefined;
        metadata?: Record<string, string> | undefined;
        amountReceived?: number | undefined;
        refunded?: boolean | undefined;
        refundedAmount?: number | undefined;
    } | undefined;
    requiresAction?: boolean | undefined;
    nextAction?: {
        type: string;
        redirectToUrl?: string | undefined;
    } | undefined;
}>;
export declare const ListPaymentMethodsResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    paymentMethods: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["card", "bank_transfer", "sepa_debit"]>;
        isDefault: z.ZodOptional<z.ZodBoolean>;
        last4: z.ZodOptional<z.ZodString>;
        brand: z.ZodOptional<z.ZodString>;
        expiryMonth: z.ZodOptional<z.ZodNumber>;
        expiryYear: z.ZodOptional<z.ZodNumber>;
        bankName: z.ZodOptional<z.ZodString>;
        accountLast4: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "card" | "bank_transfer" | "sepa_debit";
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault?: boolean | undefined;
        last4?: string | undefined;
        brand?: string | undefined;
        expiryMonth?: number | undefined;
        expiryYear?: number | undefined;
        bankName?: string | undefined;
        accountLast4?: string | undefined;
    }, {
        type: "card" | "bank_transfer" | "sepa_debit";
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault?: boolean | undefined;
        last4?: string | undefined;
        brand?: string | undefined;
        expiryMonth?: number | undefined;
        expiryYear?: number | undefined;
        bankName?: string | undefined;
        accountLast4?: string | undefined;
    }>, {
        type: "card" | "bank_transfer" | "sepa_debit";
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault?: boolean | undefined;
        last4?: string | undefined;
        brand?: string | undefined;
        expiryMonth?: number | undefined;
        expiryYear?: number | undefined;
        bankName?: string | undefined;
        accountLast4?: string | undefined;
    }, {
        type: "card" | "bank_transfer" | "sepa_debit";
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault?: boolean | undefined;
        last4?: string | undefined;
        brand?: string | undefined;
        expiryMonth?: number | undefined;
        expiryYear?: number | undefined;
        bankName?: string | undefined;
        accountLast4?: string | undefined;
    }>, "many">>;
    hasMore: z.ZodOptional<z.ZodBoolean>;
    error: z.ZodOptional<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        type: z.ZodEnum<["card_error", "validation_error", "api_error", "authentication_error"]>;
        param: z.ZodOptional<z.ZodString>;
        declineCode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    }, {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    error?: {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    } | undefined;
    paymentMethods?: {
        type: "card" | "bank_transfer" | "sepa_debit";
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault?: boolean | undefined;
        last4?: string | undefined;
        brand?: string | undefined;
        expiryMonth?: number | undefined;
        expiryYear?: number | undefined;
        bankName?: string | undefined;
        accountLast4?: string | undefined;
    }[] | undefined;
    hasMore?: boolean | undefined;
}, {
    success: boolean;
    error?: {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    } | undefined;
    paymentMethods?: {
        type: "card" | "bank_transfer" | "sepa_debit";
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault?: boolean | undefined;
        last4?: string | undefined;
        brand?: string | undefined;
        expiryMonth?: number | undefined;
        expiryYear?: number | undefined;
        bankName?: string | undefined;
        accountLast4?: string | undefined;
    }[] | undefined;
    hasMore?: boolean | undefined;
}>;
export declare const RefundResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    refund: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
        status: z.ZodEnum<["pending", "succeeded", "failed", "canceled"]>;
        reason: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "pending" | "succeeded" | "canceled" | "failed";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        amount: number;
        reason?: string | undefined;
    }, {
        status: "pending" | "succeeded" | "canceled" | "failed";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        amount: number;
        reason?: string | undefined;
    }>>;
    error: z.ZodOptional<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        type: z.ZodEnum<["card_error", "validation_error", "api_error", "authentication_error"]>;
        param: z.ZodOptional<z.ZodString>;
        declineCode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    }, {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    error?: {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    } | undefined;
    refund?: {
        status: "pending" | "succeeded" | "canceled" | "failed";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        amount: number;
        reason?: string | undefined;
    } | undefined;
}, {
    success: boolean;
    error?: {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    } | undefined;
    refund?: {
        status: "pending" | "succeeded" | "canceled" | "failed";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        amount: number;
        reason?: string | undefined;
    } | undefined;
}>;
export declare const PaymentWebhookEventSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["payment_intent.succeeded", "payment_intent.payment_failed", "payment_intent.canceled", "payment_method.attached"]>;
    data: z.ZodObject<{
        object: z.ZodUnion<[z.ZodObject<{
            id: z.ZodString;
            clientSecret: z.ZodString;
            amount: z.ZodNumber;
            currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
            status: z.ZodEnum<["requires_payment_method", "requires_confirmation", "requires_action", "processing", "succeeded", "canceled", "requires_capture"]>;
            orderId: z.ZodOptional<z.ZodString>;
            customerId: z.ZodOptional<z.ZodString>;
            paymentMethodId: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
            amountReceived: z.ZodOptional<z.ZodNumber>;
            fees: z.ZodOptional<z.ZodNumber>;
            refunded: z.ZodOptional<z.ZodBoolean>;
            refundedAmount: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        }, {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        }>, z.ZodEffects<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodEnum<["card", "bank_transfer", "sepa_debit"]>;
            isDefault: z.ZodOptional<z.ZodBoolean>;
            last4: z.ZodOptional<z.ZodString>;
            brand: z.ZodOptional<z.ZodString>;
            expiryMonth: z.ZodOptional<z.ZodNumber>;
            expiryYear: z.ZodOptional<z.ZodNumber>;
            bankName: z.ZodOptional<z.ZodString>;
            accountLast4: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        }, {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        }>, {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        }, {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        object: {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        } | {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        };
    }, {
        object: {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        } | {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        };
    }>;
    createdAt: z.ZodString;
    livemode: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    type: "payment_intent.succeeded" | "payment_intent.payment_failed" | "payment_intent.canceled" | "payment_method.attached";
    id: string;
    createdAt: string;
    data: {
        object: {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        } | {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        };
    };
    livemode: boolean;
}, {
    type: "payment_intent.succeeded" | "payment_intent.payment_failed" | "payment_intent.canceled" | "payment_method.attached";
    id: string;
    createdAt: string;
    data: {
        object: {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        } | {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        };
    };
    livemode: boolean;
}>;
export declare const PaginationParamsSchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    startingAfter: z.ZodOptional<z.ZodString>;
    endingBefore: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    startingAfter?: string | undefined;
    endingBefore?: string | undefined;
    page?: number | undefined;
}, {
    startingAfter?: string | undefined;
    endingBefore?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare const PaginatedResponseSchema: <T extends z.ZodTypeAny>(itemSchema: T) => z.ZodObject<{
    data: z.ZodArray<T, "many">;
    hasMore: z.ZodBoolean;
    totalCount: z.ZodOptional<z.ZodNumber>;
    nextPage: z.ZodOptional<z.ZodString>;
    previousPage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: T["_output"][];
    hasMore: boolean;
    totalCount?: number | undefined;
    nextPage?: string | undefined;
    previousPage?: string | undefined;
}, {
    data: T["_input"][];
    hasMore: boolean;
    totalCount?: number | undefined;
    nextPage?: string | undefined;
    previousPage?: string | undefined;
}>;
export declare const validateCreatePaymentIntent: (data: unknown) => z.SafeParseReturnType<{
    currency: "USD" | "EUR" | "GBP" | "CHF";
    amount: number;
    orderId: string;
    description?: string | undefined;
    customerId?: string | undefined;
    paymentMethodId?: string | undefined;
    metadata?: Record<string, string> | undefined;
    automaticPaymentMethods?: {
        enabled: boolean;
        allowRedirects?: "always" | "never" | undefined;
    } | undefined;
}, {
    currency: "USD" | "EUR" | "GBP" | "CHF";
    amount: number;
    orderId: string;
    description?: string | undefined;
    customerId?: string | undefined;
    paymentMethodId?: string | undefined;
    metadata?: Record<string, string> | undefined;
    automaticPaymentMethods?: {
        enabled: boolean;
        allowRedirects?: "always" | "never" | undefined;
    } | undefined;
}>;
export declare const validateConfirmPayment: (data: unknown) => z.SafeParseReturnType<{
    paymentIntentId: string;
    paymentMethodId?: string | undefined;
    returnUrl?: string | undefined;
    useStripeSdk?: boolean | undefined;
}, {
    paymentIntentId: string;
    paymentMethodId?: string | undefined;
    returnUrl?: string | undefined;
    useStripeSdk?: boolean | undefined;
}>;
export declare const validateListPaymentMethods: (data: unknown) => z.SafeParseReturnType<{
    customerId: string;
    type?: "card" | "bank_transfer" | "sepa_debit" | undefined;
    limit?: number | undefined;
}, {
    limit: number;
    customerId: string;
    type?: "card" | "bank_transfer" | "sepa_debit" | undefined;
}>;
export declare const validateRefundRequest: (data: unknown) => z.SafeParseReturnType<{
    paymentIntentId: string;
    amount?: number | undefined;
    metadata?: Record<string, string> | undefined;
    reason?: "duplicate" | "fraudulent" | "requested_by_customer" | undefined;
}, {
    paymentIntentId: string;
    amount?: number | undefined;
    metadata?: Record<string, string> | undefined;
    reason?: "duplicate" | "fraudulent" | "requested_by_customer" | undefined;
}>;
export declare const validateWebhookEvent: (data: unknown) => z.SafeParseReturnType<{
    type: "payment_intent.succeeded" | "payment_intent.payment_failed" | "payment_intent.canceled" | "payment_method.attached";
    id: string;
    createdAt: string;
    data: {
        object: {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        } | {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        };
    };
    livemode: boolean;
}, {
    type: "payment_intent.succeeded" | "payment_intent.payment_failed" | "payment_intent.canceled" | "payment_method.attached";
    id: string;
    createdAt: string;
    data: {
        object: {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        } | {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        };
    };
    livemode: boolean;
}>;
export declare const PaymentSchemas: {
    PaymentMethod: z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["card", "bank_transfer", "sepa_debit"]>;
        isDefault: z.ZodOptional<z.ZodBoolean>;
        last4: z.ZodOptional<z.ZodString>;
        brand: z.ZodOptional<z.ZodString>;
        expiryMonth: z.ZodOptional<z.ZodNumber>;
        expiryYear: z.ZodOptional<z.ZodNumber>;
        bankName: z.ZodOptional<z.ZodString>;
        accountLast4: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "card" | "bank_transfer" | "sepa_debit";
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault?: boolean | undefined;
        last4?: string | undefined;
        brand?: string | undefined;
        expiryMonth?: number | undefined;
        expiryYear?: number | undefined;
        bankName?: string | undefined;
        accountLast4?: string | undefined;
    }, {
        type: "card" | "bank_transfer" | "sepa_debit";
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault?: boolean | undefined;
        last4?: string | undefined;
        brand?: string | undefined;
        expiryMonth?: number | undefined;
        expiryYear?: number | undefined;
        bankName?: string | undefined;
        accountLast4?: string | undefined;
    }>, {
        type: "card" | "bank_transfer" | "sepa_debit";
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault?: boolean | undefined;
        last4?: string | undefined;
        brand?: string | undefined;
        expiryMonth?: number | undefined;
        expiryYear?: number | undefined;
        bankName?: string | undefined;
        accountLast4?: string | undefined;
    }, {
        type: "card" | "bank_transfer" | "sepa_debit";
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault?: boolean | undefined;
        last4?: string | undefined;
        brand?: string | undefined;
        expiryMonth?: number | undefined;
        expiryYear?: number | undefined;
        bankName?: string | undefined;
        accountLast4?: string | undefined;
    }>;
    PaymentIntent: z.ZodObject<{
        id: z.ZodString;
        clientSecret: z.ZodString;
        amount: z.ZodNumber;
        currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
        status: z.ZodEnum<["requires_payment_method", "requires_confirmation", "requires_action", "processing", "succeeded", "canceled", "requires_capture"]>;
        orderId: z.ZodOptional<z.ZodString>;
        customerId: z.ZodOptional<z.ZodString>;
        paymentMethodId: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        amountReceived: z.ZodOptional<z.ZodNumber>;
        fees: z.ZodOptional<z.ZodNumber>;
        refunded: z.ZodOptional<z.ZodBoolean>;
        refundedAmount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        updatedAt: string;
        clientSecret: string;
        amount: number;
        fees?: number | undefined;
        orderId?: string | undefined;
        customerId?: string | undefined;
        paymentMethodId?: string | undefined;
        metadata?: Record<string, string> | undefined;
        amountReceived?: number | undefined;
        refunded?: boolean | undefined;
        refundedAmount?: number | undefined;
    }, {
        status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
        id: string;
        currency: "USD" | "EUR" | "GBP" | "CHF";
        createdAt: string;
        updatedAt: string;
        clientSecret: string;
        amount: number;
        fees?: number | undefined;
        orderId?: string | undefined;
        customerId?: string | undefined;
        paymentMethodId?: string | undefined;
        metadata?: Record<string, string> | undefined;
        amountReceived?: number | undefined;
        refunded?: boolean | undefined;
        refundedAmount?: number | undefined;
    }>;
    PaymentError: z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        type: z.ZodEnum<["card_error", "validation_error", "api_error", "authentication_error"]>;
        param: z.ZodOptional<z.ZodString>;
        declineCode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    }, {
        code: string;
        message: string;
        type: "validation_error" | "card_error" | "api_error" | "authentication_error";
        param?: string | undefined;
        declineCode?: string | undefined;
    }>;
    CreatePaymentIntentRequest: z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
        orderId: z.ZodString;
        customerId: z.ZodOptional<z.ZodString>;
        paymentMethodId: z.ZodOptional<z.ZodString>;
        automaticPaymentMethods: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodBoolean;
            allowRedirects: z.ZodOptional<z.ZodEnum<["always", "never"]>>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            allowRedirects?: "always" | "never" | undefined;
        }, {
            enabled: boolean;
            allowRedirects?: "always" | "never" | undefined;
        }>>;
        description: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        currency: "USD" | "EUR" | "GBP" | "CHF";
        amount: number;
        orderId: string;
        description?: string | undefined;
        customerId?: string | undefined;
        paymentMethodId?: string | undefined;
        metadata?: Record<string, string> | undefined;
        automaticPaymentMethods?: {
            enabled: boolean;
            allowRedirects?: "always" | "never" | undefined;
        } | undefined;
    }, {
        currency: "USD" | "EUR" | "GBP" | "CHF";
        amount: number;
        orderId: string;
        description?: string | undefined;
        customerId?: string | undefined;
        paymentMethodId?: string | undefined;
        metadata?: Record<string, string> | undefined;
        automaticPaymentMethods?: {
            enabled: boolean;
            allowRedirects?: "always" | "never" | undefined;
        } | undefined;
    }>;
    ConfirmPaymentRequest: z.ZodObject<{
        paymentIntentId: z.ZodString;
        paymentMethodId: z.ZodOptional<z.ZodString>;
        returnUrl: z.ZodOptional<z.ZodString>;
        useStripeSdk: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        paymentIntentId: string;
        paymentMethodId?: string | undefined;
        returnUrl?: string | undefined;
        useStripeSdk?: boolean | undefined;
    }, {
        paymentIntentId: string;
        paymentMethodId?: string | undefined;
        returnUrl?: string | undefined;
        useStripeSdk?: boolean | undefined;
    }>;
    ListPaymentMethodsRequest: z.ZodObject<{
        customerId: z.ZodString;
        type: z.ZodOptional<z.ZodEnum<["card", "bank_transfer", "sepa_debit"]>>;
        limit: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        customerId: string;
        type?: "card" | "bank_transfer" | "sepa_debit" | undefined;
    }, {
        customerId: string;
        type?: "card" | "bank_transfer" | "sepa_debit" | undefined;
        limit?: number | undefined;
    }>;
    RefundRequest: z.ZodObject<{
        paymentIntentId: z.ZodString;
        amount: z.ZodOptional<z.ZodNumber>;
        reason: z.ZodOptional<z.ZodEnum<["duplicate", "fraudulent", "requested_by_customer"]>>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        paymentIntentId: string;
        amount?: number | undefined;
        metadata?: Record<string, string> | undefined;
        reason?: "duplicate" | "fraudulent" | "requested_by_customer" | undefined;
    }, {
        paymentIntentId: string;
        amount?: number | undefined;
        metadata?: Record<string, string> | undefined;
        reason?: "duplicate" | "fraudulent" | "requested_by_customer" | undefined;
    }>;
    CreatePaymentIntentResponse: z.ZodEffects<z.ZodObject<{
        success: z.ZodBoolean;
        paymentIntent: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            clientSecret: z.ZodString;
            amount: z.ZodNumber;
            currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
            status: z.ZodEnum<["requires_payment_method", "requires_confirmation", "requires_action", "processing", "succeeded", "canceled", "requires_capture"]>;
            orderId: z.ZodOptional<z.ZodString>;
            customerId: z.ZodOptional<z.ZodString>;
            paymentMethodId: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
            amountReceived: z.ZodOptional<z.ZodNumber>;
            fees: z.ZodOptional<z.ZodNumber>;
            refunded: z.ZodOptional<z.ZodBoolean>;
            refundedAmount: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        }, {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        }>>;
        error: z.ZodOptional<z.ZodObject<{
            code: z.ZodString;
            message: z.ZodString;
            type: z.ZodEnum<["card_error", "validation_error", "api_error", "authentication_error"]>;
            param: z.ZodOptional<z.ZodString>;
            declineCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        }, {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        success: boolean;
        error?: {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        } | undefined;
        paymentIntent?: {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        } | undefined;
    }, {
        success: boolean;
        error?: {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        } | undefined;
        paymentIntent?: {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        } | undefined;
    }>, {
        success: boolean;
        error?: {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        } | undefined;
        paymentIntent?: {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        } | undefined;
    }, {
        success: boolean;
        error?: {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        } | undefined;
        paymentIntent?: {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        } | undefined;
    }>;
    ConfirmPaymentResponse: z.ZodObject<{
        success: z.ZodBoolean;
        paymentIntent: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            clientSecret: z.ZodString;
            amount: z.ZodNumber;
            currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
            status: z.ZodEnum<["requires_payment_method", "requires_confirmation", "requires_action", "processing", "succeeded", "canceled", "requires_capture"]>;
            orderId: z.ZodOptional<z.ZodString>;
            customerId: z.ZodOptional<z.ZodString>;
            paymentMethodId: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
            amountReceived: z.ZodOptional<z.ZodNumber>;
            fees: z.ZodOptional<z.ZodNumber>;
            refunded: z.ZodOptional<z.ZodBoolean>;
            refundedAmount: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        }, {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        }>>;
        error: z.ZodOptional<z.ZodObject<{
            code: z.ZodString;
            message: z.ZodString;
            type: z.ZodEnum<["card_error", "validation_error", "api_error", "authentication_error"]>;
            param: z.ZodOptional<z.ZodString>;
            declineCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        }, {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        }>>;
        requiresAction: z.ZodOptional<z.ZodBoolean>;
        nextAction: z.ZodOptional<z.ZodObject<{
            type: z.ZodString;
            redirectToUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            redirectToUrl?: string | undefined;
        }, {
            type: string;
            redirectToUrl?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        success: boolean;
        error?: {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        } | undefined;
        paymentIntent?: {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        } | undefined;
        requiresAction?: boolean | undefined;
        nextAction?: {
            type: string;
            redirectToUrl?: string | undefined;
        } | undefined;
    }, {
        success: boolean;
        error?: {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        } | undefined;
        paymentIntent?: {
            status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            updatedAt: string;
            clientSecret: string;
            amount: number;
            fees?: number | undefined;
            orderId?: string | undefined;
            customerId?: string | undefined;
            paymentMethodId?: string | undefined;
            metadata?: Record<string, string> | undefined;
            amountReceived?: number | undefined;
            refunded?: boolean | undefined;
            refundedAmount?: number | undefined;
        } | undefined;
        requiresAction?: boolean | undefined;
        nextAction?: {
            type: string;
            redirectToUrl?: string | undefined;
        } | undefined;
    }>;
    ListPaymentMethodsResponse: z.ZodObject<{
        success: z.ZodBoolean;
        paymentMethods: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodEnum<["card", "bank_transfer", "sepa_debit"]>;
            isDefault: z.ZodOptional<z.ZodBoolean>;
            last4: z.ZodOptional<z.ZodString>;
            brand: z.ZodOptional<z.ZodString>;
            expiryMonth: z.ZodOptional<z.ZodNumber>;
            expiryYear: z.ZodOptional<z.ZodNumber>;
            bankName: z.ZodOptional<z.ZodString>;
            accountLast4: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        }, {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        }>, {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        }, {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        }>, "many">>;
        hasMore: z.ZodOptional<z.ZodBoolean>;
        error: z.ZodOptional<z.ZodObject<{
            code: z.ZodString;
            message: z.ZodString;
            type: z.ZodEnum<["card_error", "validation_error", "api_error", "authentication_error"]>;
            param: z.ZodOptional<z.ZodString>;
            declineCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        }, {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        success: boolean;
        error?: {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        } | undefined;
        paymentMethods?: {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        }[] | undefined;
        hasMore?: boolean | undefined;
    }, {
        success: boolean;
        error?: {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        } | undefined;
        paymentMethods?: {
            type: "card" | "bank_transfer" | "sepa_debit";
            id: string;
            createdAt: string;
            updatedAt: string;
            isDefault?: boolean | undefined;
            last4?: string | undefined;
            brand?: string | undefined;
            expiryMonth?: number | undefined;
            expiryYear?: number | undefined;
            bankName?: string | undefined;
            accountLast4?: string | undefined;
        }[] | undefined;
        hasMore?: boolean | undefined;
    }>;
    RefundResponse: z.ZodObject<{
        success: z.ZodBoolean;
        refund: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
            status: z.ZodEnum<["pending", "succeeded", "failed", "canceled"]>;
            reason: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: "pending" | "succeeded" | "canceled" | "failed";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            amount: number;
            reason?: string | undefined;
        }, {
            status: "pending" | "succeeded" | "canceled" | "failed";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            amount: number;
            reason?: string | undefined;
        }>>;
        error: z.ZodOptional<z.ZodObject<{
            code: z.ZodString;
            message: z.ZodString;
            type: z.ZodEnum<["card_error", "validation_error", "api_error", "authentication_error"]>;
            param: z.ZodOptional<z.ZodString>;
            declineCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        }, {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        success: boolean;
        error?: {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        } | undefined;
        refund?: {
            status: "pending" | "succeeded" | "canceled" | "failed";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            amount: number;
            reason?: string | undefined;
        } | undefined;
    }, {
        success: boolean;
        error?: {
            code: string;
            message: string;
            type: "validation_error" | "card_error" | "api_error" | "authentication_error";
            param?: string | undefined;
            declineCode?: string | undefined;
        } | undefined;
        refund?: {
            status: "pending" | "succeeded" | "canceled" | "failed";
            id: string;
            currency: "USD" | "EUR" | "GBP" | "CHF";
            createdAt: string;
            amount: number;
            reason?: string | undefined;
        } | undefined;
    }>;
    PaymentWebhookEvent: z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["payment_intent.succeeded", "payment_intent.payment_failed", "payment_intent.canceled", "payment_method.attached"]>;
        data: z.ZodObject<{
            object: z.ZodUnion<[z.ZodObject<{
                id: z.ZodString;
                clientSecret: z.ZodString;
                amount: z.ZodNumber;
                currency: z.ZodEnum<["EUR", "USD", "GBP", "CHF"]>;
                status: z.ZodEnum<["requires_payment_method", "requires_confirmation", "requires_action", "processing", "succeeded", "canceled", "requires_capture"]>;
                orderId: z.ZodOptional<z.ZodString>;
                customerId: z.ZodOptional<z.ZodString>;
                paymentMethodId: z.ZodOptional<z.ZodString>;
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                createdAt: z.ZodString;
                updatedAt: z.ZodString;
                amountReceived: z.ZodOptional<z.ZodNumber>;
                fees: z.ZodOptional<z.ZodNumber>;
                refunded: z.ZodOptional<z.ZodBoolean>;
                refundedAmount: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
                id: string;
                currency: "USD" | "EUR" | "GBP" | "CHF";
                createdAt: string;
                updatedAt: string;
                clientSecret: string;
                amount: number;
                fees?: number | undefined;
                orderId?: string | undefined;
                customerId?: string | undefined;
                paymentMethodId?: string | undefined;
                metadata?: Record<string, string> | undefined;
                amountReceived?: number | undefined;
                refunded?: boolean | undefined;
                refundedAmount?: number | undefined;
            }, {
                status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
                id: string;
                currency: "USD" | "EUR" | "GBP" | "CHF";
                createdAt: string;
                updatedAt: string;
                clientSecret: string;
                amount: number;
                fees?: number | undefined;
                orderId?: string | undefined;
                customerId?: string | undefined;
                paymentMethodId?: string | undefined;
                metadata?: Record<string, string> | undefined;
                amountReceived?: number | undefined;
                refunded?: boolean | undefined;
                refundedAmount?: number | undefined;
            }>, z.ZodEffects<z.ZodObject<{
                id: z.ZodString;
                type: z.ZodEnum<["card", "bank_transfer", "sepa_debit"]>;
                isDefault: z.ZodOptional<z.ZodBoolean>;
                last4: z.ZodOptional<z.ZodString>;
                brand: z.ZodOptional<z.ZodString>;
                expiryMonth: z.ZodOptional<z.ZodNumber>;
                expiryYear: z.ZodOptional<z.ZodNumber>;
                bankName: z.ZodOptional<z.ZodString>;
                accountLast4: z.ZodOptional<z.ZodString>;
                createdAt: z.ZodString;
                updatedAt: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "card" | "bank_transfer" | "sepa_debit";
                id: string;
                createdAt: string;
                updatedAt: string;
                isDefault?: boolean | undefined;
                last4?: string | undefined;
                brand?: string | undefined;
                expiryMonth?: number | undefined;
                expiryYear?: number | undefined;
                bankName?: string | undefined;
                accountLast4?: string | undefined;
            }, {
                type: "card" | "bank_transfer" | "sepa_debit";
                id: string;
                createdAt: string;
                updatedAt: string;
                isDefault?: boolean | undefined;
                last4?: string | undefined;
                brand?: string | undefined;
                expiryMonth?: number | undefined;
                expiryYear?: number | undefined;
                bankName?: string | undefined;
                accountLast4?: string | undefined;
            }>, {
                type: "card" | "bank_transfer" | "sepa_debit";
                id: string;
                createdAt: string;
                updatedAt: string;
                isDefault?: boolean | undefined;
                last4?: string | undefined;
                brand?: string | undefined;
                expiryMonth?: number | undefined;
                expiryYear?: number | undefined;
                bankName?: string | undefined;
                accountLast4?: string | undefined;
            }, {
                type: "card" | "bank_transfer" | "sepa_debit";
                id: string;
                createdAt: string;
                updatedAt: string;
                isDefault?: boolean | undefined;
                last4?: string | undefined;
                brand?: string | undefined;
                expiryMonth?: number | undefined;
                expiryYear?: number | undefined;
                bankName?: string | undefined;
                accountLast4?: string | undefined;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            object: {
                type: "card" | "bank_transfer" | "sepa_debit";
                id: string;
                createdAt: string;
                updatedAt: string;
                isDefault?: boolean | undefined;
                last4?: string | undefined;
                brand?: string | undefined;
                expiryMonth?: number | undefined;
                expiryYear?: number | undefined;
                bankName?: string | undefined;
                accountLast4?: string | undefined;
            } | {
                status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
                id: string;
                currency: "USD" | "EUR" | "GBP" | "CHF";
                createdAt: string;
                updatedAt: string;
                clientSecret: string;
                amount: number;
                fees?: number | undefined;
                orderId?: string | undefined;
                customerId?: string | undefined;
                paymentMethodId?: string | undefined;
                metadata?: Record<string, string> | undefined;
                amountReceived?: number | undefined;
                refunded?: boolean | undefined;
                refundedAmount?: number | undefined;
            };
        }, {
            object: {
                type: "card" | "bank_transfer" | "sepa_debit";
                id: string;
                createdAt: string;
                updatedAt: string;
                isDefault?: boolean | undefined;
                last4?: string | undefined;
                brand?: string | undefined;
                expiryMonth?: number | undefined;
                expiryYear?: number | undefined;
                bankName?: string | undefined;
                accountLast4?: string | undefined;
            } | {
                status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
                id: string;
                currency: "USD" | "EUR" | "GBP" | "CHF";
                createdAt: string;
                updatedAt: string;
                clientSecret: string;
                amount: number;
                fees?: number | undefined;
                orderId?: string | undefined;
                customerId?: string | undefined;
                paymentMethodId?: string | undefined;
                metadata?: Record<string, string> | undefined;
                amountReceived?: number | undefined;
                refunded?: boolean | undefined;
                refundedAmount?: number | undefined;
            };
        }>;
        createdAt: z.ZodString;
        livemode: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        type: "payment_intent.succeeded" | "payment_intent.payment_failed" | "payment_intent.canceled" | "payment_method.attached";
        id: string;
        createdAt: string;
        data: {
            object: {
                type: "card" | "bank_transfer" | "sepa_debit";
                id: string;
                createdAt: string;
                updatedAt: string;
                isDefault?: boolean | undefined;
                last4?: string | undefined;
                brand?: string | undefined;
                expiryMonth?: number | undefined;
                expiryYear?: number | undefined;
                bankName?: string | undefined;
                accountLast4?: string | undefined;
            } | {
                status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
                id: string;
                currency: "USD" | "EUR" | "GBP" | "CHF";
                createdAt: string;
                updatedAt: string;
                clientSecret: string;
                amount: number;
                fees?: number | undefined;
                orderId?: string | undefined;
                customerId?: string | undefined;
                paymentMethodId?: string | undefined;
                metadata?: Record<string, string> | undefined;
                amountReceived?: number | undefined;
                refunded?: boolean | undefined;
                refundedAmount?: number | undefined;
            };
        };
        livemode: boolean;
    }, {
        type: "payment_intent.succeeded" | "payment_intent.payment_failed" | "payment_intent.canceled" | "payment_method.attached";
        id: string;
        createdAt: string;
        data: {
            object: {
                type: "card" | "bank_transfer" | "sepa_debit";
                id: string;
                createdAt: string;
                updatedAt: string;
                isDefault?: boolean | undefined;
                last4?: string | undefined;
                brand?: string | undefined;
                expiryMonth?: number | undefined;
                expiryYear?: number | undefined;
                bankName?: string | undefined;
                accountLast4?: string | undefined;
            } | {
                status: "processing" | "requires_payment_method" | "requires_confirmation" | "requires_action" | "succeeded" | "canceled" | "requires_capture";
                id: string;
                currency: "USD" | "EUR" | "GBP" | "CHF";
                createdAt: string;
                updatedAt: string;
                clientSecret: string;
                amount: number;
                fees?: number | undefined;
                orderId?: string | undefined;
                customerId?: string | undefined;
                paymentMethodId?: string | undefined;
                metadata?: Record<string, string> | undefined;
                amountReceived?: number | undefined;
                refunded?: boolean | undefined;
                refundedAmount?: number | undefined;
            };
        };
        livemode: boolean;
    }>;
    PaginationParams: z.ZodObject<{
        page: z.ZodOptional<z.ZodNumber>;
        limit: z.ZodDefault<z.ZodNumber>;
        startingAfter: z.ZodOptional<z.ZodString>;
        endingBefore: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        startingAfter?: string | undefined;
        endingBefore?: string | undefined;
        page?: number | undefined;
    }, {
        startingAfter?: string | undefined;
        endingBefore?: string | undefined;
        page?: number | undefined;
        limit?: number | undefined;
    }>;
    PaginatedResponse: <T extends z.ZodTypeAny>(itemSchema: T) => z.ZodObject<{
        data: z.ZodArray<T, "many">;
        hasMore: z.ZodBoolean;
        totalCount: z.ZodOptional<z.ZodNumber>;
        nextPage: z.ZodOptional<z.ZodString>;
        previousPage: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        data: T["_output"][];
        hasMore: boolean;
        totalCount?: number | undefined;
        nextPage?: string | undefined;
        previousPage?: string | undefined;
    }, {
        data: T["_input"][];
        hasMore: boolean;
        totalCount?: number | undefined;
        nextPage?: string | undefined;
        previousPage?: string | undefined;
    }>;
};
export type PaymentMethodInput = z.infer<typeof PaymentMethodSchema>;
export type PaymentIntentInput = z.infer<typeof PaymentIntentSchema>;
export type CreatePaymentIntentInput = z.infer<typeof CreatePaymentIntentRequestSchema>;
export type ConfirmPaymentInput = z.infer<typeof ConfirmPaymentRequestSchema>;
export type ListPaymentMethodsInput = z.infer<typeof ListPaymentMethodsRequestSchema>;
export type RefundInput = z.infer<typeof RefundRequestSchema>;
export type PaymentWebhookEventInput = z.infer<typeof PaymentWebhookEventSchema>;
//# sourceMappingURL=payment-schemas.d.ts.map