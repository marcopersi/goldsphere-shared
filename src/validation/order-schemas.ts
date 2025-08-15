/**
 * Order Validation Schemas
 * 
 * Zod schemas for order-related entities and validation helper functions
 */

import { z } from 'zod';
import { OrderType, OrderStatus } from '../enums';
import { OrderTypeEnumSchema, OrderStatusEnumSchema } from './enum-schemas';

// Helper functions for order validation
export const validateOrderType = (value: string): OrderType | undefined => {
  return OrderType.fromValue(value);
};

export const validateOrderStatus = (value: string): OrderStatus | undefined => {
  return OrderStatus.fromValue(value);
};

// Order validation helpers
export const isValidOrderType = (value: string): boolean => {
  return OrderType.fromValue(value) !== undefined;
};

export const isValidOrderStatus = (value: string): boolean => {
  return OrderStatus.fromValue(value) !== undefined;
};

// Status transition validation
export const getValidStatusTransitions = (currentStatus: string): string[] => {
  const status = OrderStatus.fromValue(currentStatus);
  if (!status) return [];
  
  // Define valid status transitions
  const transitions: Record<string, string[]> = {
    'pending': ['confirmed', 'cancelled'],
    'confirmed': ['processing', 'cancelled'],
    'processing': ['shipped', 'cancelled'],
    'shipped': ['delivered', 'returned'],
    'delivered': ['completed'],
    'completed': [],
    'cancelled': [],
    'returned': ['processing', 'cancelled']
  };
  
  return transitions[currentStatus] || [];
};

export const isValidStatusTransition = (from: string, to: string): boolean => {
  return getValidStatusTransitions(from).includes(to);
};

// Entity Schemas
// Shipping Method Enum Schema
export const ShippingMethodEnumSchema = z.enum(['standard', 'priority', 'express', 'pickup']);

// Address Schema - reusable for shipping/billing addresses
export const AddressSchema = z.object({
  type: z.enum(['shipping', 'billing', 'both']),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State/Province is required'),
  zipCode: z.string().min(1, 'ZIP/Postal code is required'),
  country: z.string().length(2, 'Country must be 2-letter ISO code'), // References Country enum
  phone: z.string().optional(),
  isDefault: z.boolean().default(false)
});

// Order Item Schema - individual line items in an order
export const OrderItemSchema = z.object({
  id: z.string().uuid('Order item ID must be a valid UUID'),
  productId: z.string().uuid('Product ID must be a valid UUID'),
  quantity: z.number().positive('Quantity must be positive'),
  unitPrice: z.number().positive('Unit price must be positive'),
  totalPrice: z.number().positive('Total price must be positive'),
  custodyServiceId: z.string().uuid('Custody Service ID must be a valid UUID').optional(),
  certificateRequested: z.boolean().default(false)
});

// Order Fees Schema - breakdown of additional charges
export const OrderFeesSchema = z.object({
  shipping: z.number().nonnegative().default(0),
  insurance: z.number().nonnegative().default(0),
  certification: z.number().nonnegative().default(0),
  total: z.number().nonnegative()
});

// Payment Method Schema for orders
export const OrderPaymentMethodSchema = z.object({
  type: z.enum(['credit_card', 'bank_transfer', 'crypto', 'check', 'wire']),
  provider: z.string().optional(), // e.g., 'stripe', 'coinbase'
  last4: z.string().optional(), // Last 4 digits for cards
  brand: z.string().optional(), // e.g., 'visa', 'mastercard'
  expiryMonth: z.number().min(1).max(12).optional(),
  expiryYear: z.number().optional(),
  verified: z.boolean().default(false)
});

// CreateOrderInputSchema - for frontend input only
export const CreateOrderInputSchema = z.object({
  type: z.enum(['buy', 'sell']),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().positive('Quantity must be positive'),
    custodyServiceId: z.string().uuid().optional(),
  })).min(1, 'Order must contain at least one item'),
  shippingAddress: AddressSchema.optional(),
  paymentMethod: OrderPaymentMethodSchema.optional(),
  custodyServiceId: z.string().uuid('Custody Service ID must be a valid UUID').optional(),
  notes: z.string().optional()
});

// Deprecated: CreateOrderRequestSchema (use CreateOrderInputSchema instead)
// export const CreateOrderRequestSchema = ...
// Deprecated - replaced by CreateOrderInputSchema

// Tracking Information Schema
export const OrderTrackingSchema = z.object({
  trackingNumber: z.string().optional(),
  trackingUrl: z.string().url().optional(),
  signatureRequired: z.boolean().default(true)
});

// Order Audit Schema - track status changes
export const OrderAuditSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  previousStatus: z.string().optional(), // References OrderStatus enum
  newStatus: z.string(), // References OrderStatus enum
  changedBy: z.string().uuid(), // User ID
  reason: z.string().optional(),
  notes: z.string().optional(),
  timestamp: z.coerce.date()
});

// Main Order Schema
export const OrderSchema = z.object({
  id: z.string().uuid('Order ID must be a valid UUID'),
  orderNumber: z.string().min(1, 'Order number is required'), // Human-readable order number
  userId: z.string().uuid('User ID must be a valid UUID'),
  type: OrderTypeEnumSchema, // References OrderType enum (buy, sell)
  status: OrderStatusEnumSchema, // References OrderStatus enum
  
  // Order Items
  items: z.array(OrderItemSchema).min(1, 'Order must contain at least one item'),
  
  // Financial Information
  subtotal: z.number().nonnegative('Subtotal must be non-negative'),
  fees: OrderFeesSchema,
  taxes: z.number().nonnegative('Taxes must be non-negative'),
  totalAmount: z.number().positive('Total amount must be positive'),
  currency: z.string().length(3, 'Currency must be 3-letter ISO code'), // References Currency enum
  
  // Address Information
  shippingAddress: AddressSchema.optional(),
  
  // Payment Information
  paymentMethod: OrderPaymentMethodSchema.optional(),
  paymentStatus: z.enum(['pending', 'authorized', 'captured', 'failed', 'refunded']).default('pending'),
  paymentIntentId: z.string().optional(), // Reference to payment processor
  
  // Shipping & Tracking
  tracking: OrderTrackingSchema.optional(),
  shippingMethod: ShippingMethodEnumSchema.optional(), // 'standard', 'priority', 'express', 'pickup'
  
  
  // Additional Information
  source: z.enum(['web', 'mobile', 'api', 'admin', 'phone']).default('web'),
  notes: z.string().optional(),
  
  // Timestamps
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  
});

// Order Summary Schema - lightweight version for lists
export const OrderSummarySchema = z.object({
  id: z.string().uuid(),
  orderNumber: z.string(),
  userId: z.string().uuid(),
  type: z.string(),
  status: z.string(),
  totalAmount: z.number(),
  currency: z.string(),
  itemCount: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});

// =============================================================================
// TYPE EXPORTS (inferred from schemas)
// =============================================================================
export type CreateOrderInput = z.infer<typeof CreateOrderInputSchema>;
export type ShippingMethod = z.infer<typeof ShippingMethodEnumSchema>;
