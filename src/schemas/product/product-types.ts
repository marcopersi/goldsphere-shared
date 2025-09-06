/**
 * Product Types
 * 
 * Enhanced product interfaces extending existing Product type
 */

import { Product } from '../../types/products';

// Enhanced Product Interface (extends existing ProductSchema)
export interface ProductDetails extends Product {
  stockQuantity: number;
  minimumOrderQuantity: number;
  premiumPercentage?: number;
  diameter?: number;
  thickness?: number;
  mintage?: number;
  certification?: string;
  tags?: string[];
  // Add more detailed fields as needed
}
