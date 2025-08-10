/**
 * Core Custody Entity Schemas
 * 
 * Zod schemas for custody-related entities in the GoldSphere platform
 */

import { z } from 'zod';

// Custodian Schema
export const CustodianSchema = z.object({
  id: z.string().uuid('Custodian ID must be a valid UUID'),
  name: z.string().min(1, 'Custodian name is required'),
  value: z.string().min(1, 'Custodian value is required'),
  description: z.string().optional(),
  contactInfo: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipCode: z.string().optional(),
      country: z.string().optional()
    }).optional()
  }).optional(),
  capabilities: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  certifications: z.array(z.string()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

// Custody Service Schema
export const CustodyServiceSchema = z.object({
  id: z.string().uuid('Custody Service ID must be a valid UUID'),
  custodianId: z.string().uuid('Custodian ID must be a valid UUID'),
  custodian: CustodianSchema.optional(), // Populated when joining
  serviceName: z.string().min(1, 'Service name is required'),
  serviceType: z.string().min(1, 'Service type is required'),
  description: z.string().optional(),
  fee: z.number().min(0, 'Fee must be non-negative'),
  feeStructure: z.object({
    baseAmount: z.number().min(0),
    percentage: z.number().min(0).max(100).optional(),
    minimumFee: z.number().min(0).optional(),
    maximumFee: z.number().min(0).optional()
  }).optional(),
  paymentFrequency: z.string().min(1, 'Payment frequency is required'),
  currency: z.string().length(3, 'Currency must be 3-letter ISO code'), // References Currency enum
  maxWeight: z.number().min(0, 'Maximum weight must be non-negative'),
  weightUnit: z.enum(['grams', 'troy_ounces', 'kilograms']).default('grams'),
  supportedMetals: z.array(z.string()).optional(), // References Metal enum values
  minimumValue: z.number().min(0).optional(),
  maximumValue: z.number().min(0).optional(),
  terms: z.object({
    minimumTerm: z.string().optional(), // e.g., "3 months"
    cancellationNotice: z.string().optional(), // e.g., "30 days"
    autoRenewal: z.boolean().default(false)
  }).optional(),
  features: z.object({
    insurance: z.boolean().default(false),
    auditReports: z.boolean().default(false),
    onlineAccess: z.boolean().default(false),
    physicalDelivery: z.boolean().default(false)
  }).optional(),
  isActive: z.boolean().default(true),
  availableRegions: z.array(z.string()).optional(), // Country codes
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

// Custody Assignment Schema (for linking positions to custody services)
export const CustodyAssignmentSchema = z.object({
  id: z.string().uuid(),
  positionId: z.string().uuid('Position ID must be a valid UUID'),
  custodyServiceId: z.string().uuid('Custody Service ID must be a valid UUID'),
  custodyService: CustodyServiceSchema.optional(), // Populated when joining
  assignedDate: z.string().datetime(),
  quantity: z.number().min(0),
  storageLocation: z.string().optional(),
  certificateNumber: z.string().optional(),
  status: z.enum(['active', 'pending', 'transferred', 'withdrawn']).default('active'),
  notes: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});
