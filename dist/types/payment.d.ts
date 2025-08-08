/**
 * Payment Types for GoldSphere Platform
 */
import { Currency, PaymentMethodType, PaginationParams, BaseProviderConfig, BaseApiConfig, Timestamps } from './common';
export type PaymentIntentStatus = 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled' | 'requires_capture';
export type PaymentErrorType = 'card_error' | 'validation_error' | 'api_error' | 'authentication_error';
export interface PaymentMethod extends Timestamps {
    id: string;
    type: PaymentMethodType;
    isDefault?: boolean;
    last4?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
    bankName?: string;
    accountLast4?: string;
}
export interface PaymentIntent extends Timestamps {
    id: string;
    clientSecret: string;
    amount: number;
    currency: Currency;
    status: PaymentIntentStatus;
    orderId?: string;
    customerId?: string;
    paymentMethodId?: string;
    metadata?: Record<string, string>;
    amountReceived?: number;
    fees?: number;
    refunded?: boolean;
    refundedAmount?: number;
}
export interface PaymentError {
    code: string;
    message: string;
    type: PaymentErrorType;
    param?: string;
    declineCode?: string;
}
export interface CreatePaymentIntentRequest {
    amount: number;
    currency: Currency;
    orderId: string;
    customerId?: string;
    paymentMethodId?: string;
    automaticPaymentMethods?: {
        enabled: boolean;
        allowRedirects?: 'always' | 'never';
    };
    description?: string;
    metadata?: Record<string, string>;
}
export interface CreatePaymentIntentResponse {
    success: boolean;
    paymentIntent?: PaymentIntent;
    error?: PaymentError;
}
export interface ConfirmPaymentRequest {
    paymentIntentId: string;
    paymentMethodId?: string;
    returnUrl?: string;
    useStripeSdk?: boolean;
}
export interface ConfirmPaymentResponse {
    success: boolean;
    paymentIntent?: PaymentIntent;
    error?: PaymentError;
    requiresAction?: boolean;
    nextAction?: {
        type: string;
        redirectToUrl?: string;
    };
}
export interface RetrievePaymentIntentResponse {
    success: boolean;
    paymentIntent?: PaymentIntent;
    error?: PaymentError;
}
export interface ListPaymentMethodsRequest {
    customerId: string;
    type?: PaymentMethodType;
    limit?: number;
}
export interface ListPaymentMethodsResponse {
    success: boolean;
    paymentMethods?: PaymentMethod[];
    hasMore?: boolean;
    error?: PaymentError;
}
export interface RefundRequest {
    paymentIntentId: string;
    amount?: number;
    reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer';
    metadata?: Record<string, string>;
}
export interface RefundResponse {
    success: boolean;
    refund?: {
        id: string;
        amount: number;
        currency: Currency;
        status: 'pending' | 'succeeded' | 'failed' | 'canceled';
        reason?: string;
        createdAt: string;
    };
    error?: PaymentError;
}
export interface PaymentProviderImplementation {
    name: string;
    createPaymentIntent(request: CreatePaymentIntentRequest): Promise<CreatePaymentIntentResponse>;
    confirmPayment(request: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse>;
    retrievePaymentIntent(paymentIntentId: string): Promise<RetrievePaymentIntentResponse>;
    getPaymentMethods(request: ListPaymentMethodsRequest): Promise<ListPaymentMethodsResponse>;
    refundPayment?(request: RefundRequest): Promise<RefundResponse>;
}
export interface StripeConfig extends BaseProviderConfig {
    provider: 'stripe';
    publicKey?: string;
    secretKey?: string;
    webhookSecret?: string;
    apiVersion?: string;
}
export interface MockConfig extends BaseProviderConfig {
    provider: 'mock';
}
export type ProviderConfig = StripeConfig | MockConfig;
export interface PaymentConfig extends BaseApiConfig {
    provider: 'stripe' | 'mock';
    testMode: boolean;
    publicKey?: string;
    secretKey?: string;
    webhookSecret?: string;
    apiVersion?: string;
}
export interface PaymentWebhookEvent extends Timestamps {
    id: string;
    type: 'payment_intent.succeeded' | 'payment_intent.payment_failed' | 'payment_intent.canceled' | 'payment_method.attached';
    data: {
        object: PaymentIntent | PaymentMethod;
    };
    livemode: boolean;
}
export interface PaymentPaginationParams extends PaginationParams {
    startingAfter?: string;
    endingBefore?: string;
}
export interface PaymentPaginatedResponse<T> {
    data: T[];
    hasMore: boolean;
    totalCount?: number;
    nextPage?: string;
    previousPage?: string;
}
//# sourceMappingURL=payment.d.ts.map