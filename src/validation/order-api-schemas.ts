/**
 * Order API Request/Response Schemas
 * 
 * Zod schemas for order API endpoints
 */

import { z } from 'zod';
import { OrderSchema, AddressSchema, OrderFeesSchema, OrderItemSchema, isValidStatusTransition, ShippingMethodEnumSchema } from './order-schemas';
import { CommonPaginationSchema } from './common-schemas';
import { OrderTypeEnumSchema, OrderStatusEnumSchema, CurrencyEnumSchema } from './enum-schemas';

// ============================================================================= 
// REQUEST SCHEMAS
// =============================================================================

// Create order request (omit generated fields)
export const CreateOrderRequestSchema = OrderSchema.omit({ 
  id: true, 
  orderNumber: true,
  createdAt: true, 
  updatedAt: true
});

// Update order request (partial, omit immutable fields)
export const UpdateOrderRequestSchema = OrderSchema.partial().omit({ 
  id: true, 
  orderNumber: true,
  createdAt: true,
  userId: true  // userId shouldn't change after creation
});

// Order status update (for processing workflow)
export const UpdateOrderStatusRequestSchema = z.object({
  status: OrderStatusEnumSchema,
  reason: z.string().optional(),
  notes: z.string().optional()
});

// Legacy schemas for backwards compatibility
export const AddOrderItemRequestSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().positive(),
  custodyServiceId: z.string().uuid().optional()
});

export const UpdateOrderItemRequestSchema = z.object({
  quantity: z.number().positive().optional(),
  custodyServiceId: z.string().uuid().optional()
});

export const ProcessOrderRequestSchema = z.object({
  action: z.enum(['confirm', 'cancel', 'ship', 'deliver', 'complete']),
  reason: z.string().optional(),
  notes: z.string().optional(),
  tracking: z.object({
    trackingNumber: z.string().optional(),
    carrier: z.string().optional(),
    estimatedDelivery: z.coerce.date().optional()
  }).optional()
});

export const AssignCustodyRequestSchema = z.object({
  assignments: z.array(z.object({
    itemId: z.string().uuid(),
    custodianId: z.string().uuid(),
    custodyServiceId: z.string().uuid()
  })).min(1)
});

export const CalculateOrderRequestSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().positive()
  })).min(1),
  shippingAddress: AddressSchema.optional(),
  shippingMethod: ShippingMethodEnumSchema.optional(),
  currency: z.string().length(3).optional()
});

// =============================================================================
// RESPONSE SCHEMAS  
// =============================================================================

// Single order response
export const OrderResponseSchema = z.object({
  success: z.boolean(),
  data: OrderSchema
});

// Multiple orders response (paginated)
export const OrdersResponseSchema = z.object({
  orders: z.array(OrderSchema),
  pagination: CommonPaginationSchema,
  user: z.object({
    id: z.string()
  }).optional()
});

export const AdminOrdersResponseSchema = z.object({
  orders: z.array(OrderSchema),
  pagination: CommonPaginationSchema,
  statistics: z.object({
    totalOrders: z.number().int(),
    pendingOrders: z.number().int(),
    completedOrders: z.number().int(),
    cancelledOrders: z.number().int(),
    uniqueUsers: z.number().int()
  }),
  filters: z.object({
    status: z.string().optional(),
    type: z.string().optional(),
    userId: z.string().optional()
  }),
  adminContext: z.object({
    requestedBy: z.string(),
    role: z.string()
  })
});

export const SmartOrdersResponseSchema = z.object({
  orders: z.array(OrderSchema),
  pagination: CommonPaginationSchema,
  context: z.object({
    requestedBy: z.string(),
    viewingOrdersFor: z.string(),
    endpointType: z.string(),
    suggestion: z.string().optional()
  })
});

// Order creation response
export const CreateOrderResponseSchema = z.object({
  success: z.boolean(),
  data: OrderSchema
});

// Order update response
export const UpdateOrderResponseSchema = z.object({
  success: z.boolean(),
  data: OrderSchema
});

export const OrderCalculationResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    items: z.array(z.object({
      productId: z.string().uuid(),
      productName: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
      totalPrice: z.number()
    })),
    subtotal: z.number(),
    fees: OrderFeesSchema,
    taxes: z.number(),
    totalAmount: z.number(),
    currency: z.string()
  })
});

export const OrderStatsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    totalOrders: z.number(),
    totalValue: z.number(),
    averageOrderValue: z.number(),
    ordersByStatus: z.record(z.string(), z.number()),
    ordersByType: z.record(z.string(), z.number()),
    topProducts: z.array(z.object({
      productId: z.string().uuid(),
      productName: z.string(),
      quantity: z.number(),
      totalValue: z.number()
    })),
    period: z.object({
      startDate: z.coerce.date(),
      endDate: z.coerce.date()
    })
  })
});

// =============================================================================
// QUERY PARAMETER SCHEMAS
// =============================================================================

// Order filtering and pagination
export const OrderQueryParamsSchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 20),
  status: OrderStatusEnumSchema.optional(),
  type: OrderTypeEnumSchema.optional(),
  userId: z.string().uuid().optional(),
  dateFrom: z.string().optional(), // ISO date string
  dateTo: z.string().optional(),   // ISO date string
  minAmount: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  maxAmount: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  currency: CurrencyEnumSchema.optional(),
  search: z.string().optional(), // Search by order number, customer name, etc.
  priority: z.enum(['normal', 'high', 'urgent']).optional(),
  source: z.enum(['web', 'mobile', 'api', 'admin', 'phone']).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'totalAmount', 'orderNumber']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

// Legacy alias for backwards compatibility
export const OrdersQuerySchema = OrderQueryParamsSchema;

export const OrderStatsQuerySchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  groupBy: z.enum(['day', 'week', 'month']).default('day'),
  currency: z.string().length(3).optional(),
  status: z.string().optional(),
  type: z.string().optional()
});

// =============================================================================
// TYPE EXPORTS
// =============================================================================

// Export inferred types
export type Order = z.infer<typeof OrderSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type OrderFees = z.infer<typeof OrderFeesSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type CreateOrderRequest = z.infer<typeof CreateOrderRequestSchema>;
export type UpdateOrderRequest = z.infer<typeof UpdateOrderRequestSchema>;
export type UpdateOrderStatusRequest = z.infer<typeof UpdateOrderStatusRequestSchema>;
export type OrderResponse = z.infer<typeof OrderResponseSchema>;
export type OrdersResponse = z.infer<typeof OrdersResponseSchema>;
export type AdminOrdersResponse = z.infer<typeof AdminOrdersResponseSchema>;
export type SmartOrdersResponse = z.infer<typeof SmartOrdersResponseSchema>;
export type CreateOrderResponse = z.infer<typeof CreateOrderResponseSchema>;
export type UpdateOrderResponse = z.infer<typeof UpdateOrderResponseSchema>;
export type OrderQueryParams = z.infer<typeof OrderQueryParamsSchema>;
export type OrderCalculationResponse = z.infer<typeof OrderCalculationResponseSchema>;
export type OrderStatsResponse = z.infer<typeof OrderStatsResponseSchema>;

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

// Order validation utilities
export const validateOrderItems = (items: OrderItem[]): boolean => {
  return items.every(item => Math.abs(item.totalPrice - (item.quantity * item.unitPrice)) < 0.01);
};

export const validateOrderTotals = (order: Partial<Order>): boolean => {
  if (!order.items || !order.subtotal || !order.fees || typeof order.taxes !== 'number' || !order.totalAmount) {
    return false;
  }
  
  const itemsTotal = order.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const feesTotal = Object.values(order.fees).reduce((sum, fee) => sum + (fee || 0), 0);
  const expectedTotal = itemsTotal + feesTotal + order.taxes;
  
  return Math.abs(expectedTotal - order.totalAmount) < 0.01; // Allow for floating point precision
};

export const validateOrderStatus = (currentStatus: string, newStatus: string): boolean => {
  return isValidStatusTransition(currentStatus, newStatus);
};

export const calculateOrderTotals = (items: OrderItem[], fees: OrderFees, taxes: number) => {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const feesTotal = Object.values(fees).reduce((sum, fee) => sum + (fee || 0), 0);
  const totalAmount = subtotal + feesTotal + taxes;
  
  return {
    subtotal,
    totalAmount
  };
};
