/**
 * Custody API Request/Response Schemas
 * 
 * Zod schemas for custody API endpoints
 */

import { z } from 'zod';
import { CustodianSchema, CustodyServiceSchema, CustodyAssignmentSchema } from './custody-schemas';
import { PaginationSchema } from './common-schemas';

// Request Schemas
export const CreateCustodianRequestSchema = z.object({
  name: z.string().min(1, 'Custodian name is required'),
  description: z.string().optional(),
  contactInfo: CustodianSchema.shape.contactInfo.optional(),
  capabilities: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional()
});

export const UpdateCustodianRequestSchema = CreateCustodianRequestSchema.partial();

export const CreateCustodyServiceRequestSchema = z.object({
  custodianId: z.string().uuid(),
  serviceName: z.string().min(1),
  serviceType: z.string(),
  description: z.string().optional(),
  fee: z.number().min(0),
  feeStructure: CustodyServiceSchema.shape.feeStructure.optional(),
  paymentFrequency: z.string(),
  currency: z.string().length(3),
  maxWeight: z.number().min(0),
  weightUnit: z.enum(['grams', 'troy_ounces', 'kilograms']).optional(),
  supportedMetals: z.array(z.string()).optional(),
  minimumValue: z.number().min(0).optional(),
  maximumValue: z.number().min(0).optional(),
  terms: CustodyServiceSchema.shape.terms.optional(),
  features: CustodyServiceSchema.shape.features.optional(),
  availableRegions: z.array(z.string()).optional()
});

export const UpdateCustodyServiceRequestSchema = CreateCustodyServiceRequestSchema.partial();

export const CreateCustodyAssignmentRequestSchema = z.object({
  positionId: z.string().uuid(),
  custodyServiceId: z.string().uuid(),
  quantity: z.number().min(0),
  storageLocation: z.string().optional(),
  certificateNumber: z.string().optional(),
  notes: z.string().optional()
});

export const UpdateCustodyAssignmentRequestSchema = z.object({
  quantity: z.number().min(0).optional(),
  storageLocation: z.string().optional(),
  certificateNumber: z.string().optional(),
  status: z.enum(['active', 'pending', 'transferred', 'withdrawn']).optional(),
  notes: z.string().optional()
});

// Response Schemas
export const CustodianResponseSchema = z.object({
  success: z.boolean(),
  data: CustodianSchema
});

export const CustodiansResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    custodians: z.array(CustodianSchema),
    pagination: PaginationSchema
  })
});

export const CustodyServiceResponseSchema = z.object({
  success: z.boolean(),
  data: CustodyServiceSchema
});

export const CustodyServicesResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    custodyServices: z.array(CustodyServiceSchema),
    pagination: PaginationSchema
  })
});

export const CustodyAssignmentResponseSchema = z.object({
  success: z.boolean(),
  data: CustodyAssignmentSchema
});

export const CustodyAssignmentsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    custodyAssignments: z.array(CustodyAssignmentSchema),
    pagination: PaginationSchema
  })
});

// Query Schemas
export const CustodiansQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 20),
  search: z.string().optional(),
  isActive: z.string().optional().transform(val => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    return undefined;
  }),
  region: z.string().optional()
});

export const CustodyServicesQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 20),
  search: z.string().optional(),
  custodianId: z.string().uuid().optional(),
  serviceType: z.string().optional(),
  paymentFrequency: z.string().optional(),
  currency: z.string().length(3).optional(),
  maxFee: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  region: z.string().optional(),
  isActive: z.string().optional().transform(val => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    return undefined;
  })
});

export const CustodyAssignmentsQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 20),
  positionId: z.string().uuid().optional(),
  custodyServiceId: z.string().uuid().optional(),
  status: z.enum(['active', 'pending', 'transferred', 'withdrawn']).optional()
});
