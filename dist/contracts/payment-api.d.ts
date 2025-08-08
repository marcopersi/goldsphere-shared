import type { PaymentMethod, PaymentError, CreatePaymentIntentRequest, CreatePaymentIntentResponse, ConfirmPaymentRequest, ConfirmPaymentResponse, RetrievePaymentIntentResponse, ListPaymentMethodsResponse, RefundRequest, RefundResponse, PaymentWebhookEvent } from '../types/payment';
import { RequestOptions, NetworkError, TimeoutError, RateLimitError, ValidationError } from '../types/common';
/**
 * Configuration for the payment API client
 */
export interface PaymentAPIConfig {
    /** Base URL for the payment API */
    baseUrl: string;
    /** API key for authentication */
    apiKey: string;
    /** API version */
    version?: string;
    /** Request timeout in milliseconds */
    timeout?: number;
    /** Whether to enable debug logging */
    debug?: boolean;
}
/**
 * Payment API client interface
 */
export interface PaymentAPIClient {
    /**
     * Create a new payment intent
     */
    createPaymentIntent(request: CreatePaymentIntentRequest, options?: RequestOptions): Promise<CreatePaymentIntentResponse>;
    /**
     * Confirm a payment intent
     */
    confirmPayment(request: ConfirmPaymentRequest, options?: RequestOptions): Promise<ConfirmPaymentResponse>;
    /**
     * Retrieve a payment intent by ID
     */
    retrievePaymentIntent(paymentIntentId: string, options?: RequestOptions): Promise<RetrievePaymentIntentResponse>;
    /**
     * List payment methods for a customer
     */
    listPaymentMethods(params: {
        customerId: string;
        type?: PaymentMethod['type'];
        limit?: number;
    }, options?: RequestOptions): Promise<ListPaymentMethodsResponse>;
    /**
     * Create a refund
     */
    refundPayment(request: RefundRequest, options?: RequestOptions): Promise<RefundResponse>;
    /**
     * Process webhook events
     */
    processWebhook(event: PaymentWebhookEvent, signature: string): Promise<{
        received: boolean;
    }>;
}
/**
 * Error types that can occur during API operations
 */
export type PaymentAPIError = PaymentError | NetworkError | TimeoutError | RateLimitError | ValidationError;
/**
 * Utility type for API operation results
 */
export type PaymentAPIResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: PaymentAPIError;
};
//# sourceMappingURL=payment-api.d.ts.map