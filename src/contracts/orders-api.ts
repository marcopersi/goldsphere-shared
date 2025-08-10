/**
 * Order API Contract
 * 
 * API endpoint definitions for order management
 */

import { z } from 'zod';
import {
  OrdersQuerySchema,
  OrderStatsQuerySchema,
  CreateOrderRequestSchema,
  UpdateOrderRequestSchema,
  AddOrderItemRequestSchema,
  UpdateOrderItemRequestSchema,
  ProcessOrderRequestSchema,
  AssignCustodyRequestSchema,
  CalculateOrderRequestSchema,
  OrderResponseSchema,
  OrdersResponseSchema,
  OrderCalculationResponseSchema,
  OrderStatsResponseSchema
} from '../schemas/orders-api';

// Order Management endpoints
export const orderApiContract = {
  orders: {
    // GET /orders
    list: {
      method: 'GET' as const,
      path: '/orders',
      query: OrdersQuerySchema,
      responses: {
        200: OrdersResponseSchema
      }
    },
    
    // POST /orders
    create: {
      method: 'POST' as const,
      path: '/orders',
      body: CreateOrderRequestSchema,
      responses: {
        201: OrderResponseSchema
      }
    },
    
    // GET /orders/:id
    get: {
      method: 'GET' as const,
      path: '/orders/:id',
      pathParams: z.object({
        id: z.string().uuid()
      }),
      responses: {
        200: OrderResponseSchema
      }
    },
    
    // PUT /orders/:id
    update: {
      method: 'PUT' as const,
      path: '/orders/:id',
      pathParams: z.object({
        id: z.string().uuid()
      }),
      body: UpdateOrderRequestSchema,
      responses: {
        200: OrderResponseSchema
      }
    },
    
    // DELETE /orders/:id
    delete: {
      method: 'DELETE' as const,
      path: '/orders/:id',
      pathParams: z.object({
        id: z.string().uuid()
      }),
      responses: {
        204: z.object({
          success: z.boolean()
        })
      }
    },
    
    // POST /orders/:id/process
    process: {
      method: 'POST' as const,
      path: '/orders/:id/process',
      pathParams: z.object({
        id: z.string().uuid()
      }),
      body: ProcessOrderRequestSchema,
      responses: {
        200: OrderResponseSchema
      }
    },
    
    // POST /orders/calculate
    calculate: {
      method: 'POST' as const,
      path: '/orders/calculate',
      body: CalculateOrderRequestSchema,
      responses: {
        200: OrderCalculationResponseSchema
      }
    },
    
    // GET /orders/stats
    getStats: {
      method: 'GET' as const,
      path: '/orders/stats',
      query: OrderStatsQuerySchema,
      responses: {
        200: OrderStatsResponseSchema
      }
    }
  },
  
  orderItems: {
    // POST /orders/:orderId/items
    add: {
      method: 'POST' as const,
      path: '/orders/:orderId/items',
      pathParams: z.object({
        orderId: z.string().uuid()
      }),
      body: AddOrderItemRequestSchema,
      responses: {
        201: OrderResponseSchema
      }
    },
    
    // PUT /orders/:orderId/items/:itemId
    update: {
      method: 'PUT' as const,
      path: '/orders/:orderId/items/:itemId',
      pathParams: z.object({
        orderId: z.string().uuid(),
        itemId: z.string().uuid()
      }),
      body: UpdateOrderItemRequestSchema,
      responses: {
        200: OrderResponseSchema
      }
    },
    
    // DELETE /orders/:orderId/items/:itemId
    remove: {
      method: 'DELETE' as const,
      path: '/orders/:orderId/items/:itemId',
      pathParams: z.object({
        orderId: z.string().uuid(),
        itemId: z.string().uuid()
      }),
      responses: {
        200: OrderResponseSchema
      }
    }
  },
  
  custody: {
    // POST /orders/:orderId/custody/assign
    assign: {
      method: 'POST' as const,
      path: '/orders/:orderId/custody/assign',
      pathParams: z.object({
        orderId: z.string().uuid()
      }),
      body: AssignCustodyRequestSchema,
      responses: {
        200: OrderResponseSchema
      }
    },
    
    // GET /orders/:orderId/custody
    getCustodyAssignments: {
      method: 'GET' as const,
      path: '/orders/:orderId/custody',
      pathParams: z.object({
        orderId: z.string().uuid()
      }),
      responses: {
        200: z.object({
          success: z.boolean(),
          data: z.object({
            orderId: z.string().uuid(),
            assignments: z.array(z.object({
              itemId: z.string().uuid(),
              custodianId: z.string().uuid(),
              custodyServiceId: z.string().uuid(),
              assignedAt: z.string().datetime(),
              status: z.string()
            }))
          })
        })
      }
    }
  }
} as const;
