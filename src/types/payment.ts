/**
 * Payment Types for GoldSphere Platform
 */

import { 
  PaymentMethodType, 
  PaginationParams,
  BaseProviderConfig,
  BaseApiConfig,
  Timestamps
} from './common';

import {Currency} from '../enums';

// Payment-specific types
export type PaymentIntentStatus = 
  | 'requires_payment_method' 
  | 'requires_confirmation' 
  | 'requires_action' 
  | 'processing' 
  | 'succeeded' 
  | 'canceled' 
  | 'requires_capture';

export type PaymentErrorType = 'card_error' | 'validation_error' | 'api_error' | 'authentication_error';

// Core Entities
export interface PaymentMethod extends Timestamps {
  id: string;
  type: PaymentMethodType;
  isDefault?: boolean;
  // Card specific
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  // Bank specific
  bankName?: string;
  accountLast4?: string;
}

export interface PaymentIntent extends Timestamps {
  id: string;
  clientSecret: string;
  amount: number; // in cents
  currency: Currency;
  status: PaymentIntentStatus;
  customerId?: string;
  paymentMethodId?: string;
  metadata?: Record<string, string>;
  // Payment details
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

// Request/Response Types
export interface CreatePaymentIntentRequest {
  referenceId: string;
  currency: Currency;
}

export interface CartPaymentIntentRequest {
  referenceIds: string[];
  currency: Currency;
}

export interface PaymentIntentData {
  paymentIntentId: string;
  clientSecret: string;
  status: PaymentIntentStatus;
  amount: number;
  currency: Currency;
  referenceId: string;
}

export interface CartPaymentIntentData {
  paymentIntentId: string;
  clientSecret: string;
  status: PaymentIntentStatus;
  amount: number;
  currency: Currency;
  referenceIds: string[];
}

export interface CreatePaymentIntentResponse {
  success: true;
  data: PaymentIntentData;
}

export interface CreateCartPaymentIntentResponse {
  success: true;
  data: CartPaymentIntentData;
}

export interface ConfirmPaymentInput {
  paymentMethodId?: string;
  returnUrl?: string;
  useStripeSdk?: boolean;
}

export interface ConfirmPaymentRequest extends ConfirmPaymentInput {
  paymentIntentId: string;
}

export interface ConfirmPaymentResponse {
  success: true;
  paymentIntent: PaymentIntent;
  requiresAction?: boolean;
  nextAction?: {
    type: string;
    redirectToUrl?: string;
  };
}

export interface RetrievePaymentIntentResponse {
  success: true;
  data: PaymentIntentData;
}

export interface ListPaymentMethodsRequest {
  customerId: string;
  type?: PaymentMethodType;
  limit?: number;
}

export interface ListPaymentMethodsResponse {
  success: true;
  paymentMethods: PaymentMethod[];
  hasMore: boolean;
}

export interface RefundRequest {
  paymentIntentId: string;
  amount?: number; // partial refund amount in cents
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer';
  metadata?: Record<string, string>;
}

export interface RefundResponse {
  success: true;
  refund: {
    id: string;
    amount: number;
    currency: Currency;
    status: 'pending' | 'succeeded' | 'failed' | 'canceled';
    reason?: string;
    createdAt: Date;
  };
}

// Provider Interface (for implementation)
export interface PaymentProviderImplementation {
  name: string;
  createPaymentIntent(request: CreatePaymentIntentRequest): Promise<CreatePaymentIntentResponse>;
  createCartPaymentIntent?(request: CartPaymentIntentRequest): Promise<CreateCartPaymentIntentResponse>;
  confirmPayment(request: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse>;
  retrievePaymentIntent(paymentIntentId: string): Promise<RetrievePaymentIntentResponse>;
  getPaymentMethods(request: ListPaymentMethodsRequest): Promise<ListPaymentMethodsResponse>;
  refundPayment?(request: RefundRequest): Promise<RefundResponse>;
}

// Provider-specific configurations extending the base from common
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

// Payment configuration type union
export type ProviderConfig = StripeConfig | MockConfig;

// Main payment configuration
export interface PaymentConfig extends BaseApiConfig {
  provider: 'stripe' | 'mock';
  testMode: boolean;
  publicKey?: string;
  secretKey?: string;
  webhookSecret?: string;
  apiVersion?: string;
}

// Webhook Events
export interface PaymentWebhookEvent extends Timestamps {
  id: string;
  type: 'payment_intent.succeeded' | 'payment_intent.payment_failed' | 'payment_intent.canceled' | 'payment_method.attached';
  data: {
    object: PaymentIntent | PaymentMethod;
  };
  livemode: boolean;
}

// Payment-specific pagination for Stripe-style APIs
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
