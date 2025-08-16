import { z } from 'zod';
import { PositionSchema, PortfolioSummarySchema } from './portfolio-schemas';

// Single unified response for portfolio positions using canonical Position + Product schemas
export const PortfolioPositionsResponseSchema = z.object({
  success: z.boolean(),
  portfolioId: z.string().uuid(),
  positions: z.array(PositionSchema),
  summary: PortfolioSummarySchema,
});

// Inferred type for the response
export type PortfolioPositionsResponse = z.infer<typeof PortfolioPositionsResponseSchema>;
