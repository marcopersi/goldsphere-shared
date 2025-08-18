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

// Address handling removed per KISS directive
export const AddressSchema = z.never();

// Order Item Schema - individual line items in an order
export const OrderItemSchema = z.object({
  id: z.string().uuid('Order item ID must be a valid UUID'),
  productId: z.string().uuid('Product ID must be a valid UUID'),
  quantity: z.number().positive('Quantity must be positive'),
  unitPrice: z.number().positive('Unit price must be positive'),
  totalPrice: z.number().positive('Total price must be positive'),
  certificateRequested: z.boolean().default(false)
});

// Order Fees Schema - breakdown of additional charges
// Fees removed per KISS directive
export const OrderFeesSchema = z.never();

// Payment Method Schema for orders
// Payment method removed per KISS directive
export const OrderPaymentMethodSchema = z.never();

// CreateOrderInputSchema - for frontend input only
export const CreateOrderInputSchema = z.object({
  type: z.enum(['buy', 'sell']),
  currency: z.string().length(3),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().positive('Quantity must be positive'),
  })).min(1, 'Order must contain at least one item'),
  // address/payment removed
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
  status: OrderStatusEnumSchema,
  
  // Order Items
  items: z.array(OrderItemSchema).min(1, 'Order must contain at least one item'),
  
  // Financial Information
  subtotal: z.number().nonnegative('Subtotal must be non-negative'),
  taxes: z.number().nonnegative('Taxes must be non-negative'),
  totalAmount: z.number().positive('Total amount must be positive'),
  currency: z.string().length(3),  

  // Address Information
  // removed
  
  // Payment Information
  // removed
  
  // Custody Information
  custodyServiceId: z.string().uuid('Custody Service ID must be a valid UUID').optional(),
  
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
