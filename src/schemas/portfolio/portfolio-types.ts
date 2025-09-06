/**
 * Portfolio Types
 * 
 * Core portfolio interfaces and types
 */

import { Position } from '../../types/portfolio';

// Portfolio Interfaces
export interface Portfolio {
  id: string;
  portfolioName: string;
  ownerId: string;
  description?: string | null;
  isActive: boolean;
  totalValue: number;
  totalCost: number;
  totalGainLoss: number;
  totalGainLossPercentage: number;
  positionCount: number;
  lastUpdated: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface PortfolioWithPositions extends Portfolio {
  positions: Position[];
}
