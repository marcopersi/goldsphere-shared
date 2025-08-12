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
  productName: z.string().min(1, 'Product name is required'),
  productType: z.string(), // References ProductType enum
  metal: z.string(), // References Metal enum
  weight: z.number().positive('Weight must be positive'),
  weightUnit: z.enum(['grams', 'troy_ounces', 'kilograms']).default('troy_ounces'),
  purity: z.string().optional(), // e.g., "99.99%", ".999 fine"
  quantity: z.number().positive('Quantity must be positive'),
  unitPrice: z.number().positive('Unit price must be positive'),
  totalPrice: z.number().positive('Total price must be positive'),
  currency: z.string().length(3, 'Currency must be 3-letter ISO code'), // References Currency enum
  specifications: z.record(z.string(), z.any()).optional(),
  producer: z.string().optional(), // References Producer enum
  custodyPreference: z.string().optional(), // References Custodian enum
  certificateRequested: z.boolean().default(false)
});

// Order Fees Schema - breakdown of additional charges
export const OrderFeesSchema = z.object({
  processing: z.number().nonnegative().default(0),
  shipping: z.number().nonnegative().default(0),
  insurance: z.number().nonnegative().default(0),
  custodySetup: z.number().nonnegative().default(0),
  certification: z.number().nonnegative().default(0),
  handling: z.number().nonnegative().default(0),
  urgentProcessing: z.number().nonnegative().default(0),
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

// Tracking Information Schema
export const OrderTrackingSchema = z.object({
  trackingNumber: z.string().optional(),
  carrier: z.string().optional(), // e.g., 'FedEx', 'UPS', 'DHL'
  service: z.string().optional(), // e.g., 'Overnight', 'Ground'
  estimatedDelivery: z.coerce.date().optional(),
  actualDelivery: z.coerce.date().optional(),
  trackingUrl: z.string().url().optional(),
  signatureRequired: z.boolean().default(true),
  insuranceAmount: z.number().nonnegative().optional()
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
  priority: z.enum(['normal', 'high', 'urgent']).default('normal'),
  
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
  billingAddress: AddressSchema.optional(),
  
  // Payment Information
  paymentMethod: OrderPaymentMethodSchema.optional(),
  paymentStatus: z.enum(['pending', 'authorized', 'captured', 'failed', 'refunded']).default('pending'),
  paymentIntentId: z.string().optional(), // Reference to payment processor
  
  // Shipping & Tracking
  tracking: OrderTrackingSchema.optional(),
  shippingMethod: z.string().optional(), // e.g., 'standard', 'expedited', 'overnight'
  
  // Custody Information
  custodyAssignments: z.array(z.object({
    itemId: z.string().uuid(),
    custodianId: z.string().uuid(),
    custodyServiceId: z.string().uuid(),
    assignedAt: z.coerce.date()
  })).optional(),
  
  // Additional Information
  source: z.enum(['web', 'mobile', 'api', 'admin', 'phone']).default('web'),
  salesRepId: z.string().uuid().optional(),
  notes: z.string().optional(),
  internalNotes: z.string().optional(), // Only visible to staff
  
  // Timestamps
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  completedAt: z.coerce.date().optional(),
  cancelledAt: z.coerce.date().optional(),
  
  // Audit Trail
  auditTrail: z.array(OrderAuditSchema).optional()
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
