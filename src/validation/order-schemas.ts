/**
 * Order Validation Schemas
 * 
 * Zod validation helper functions for order-related operations
 */

import { OrderType, OrderStatus } from '../enums';

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
