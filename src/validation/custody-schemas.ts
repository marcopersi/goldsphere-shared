/**
 * Custody Validation Schemas for GoldSphere Platform
 * 
 * Zod schemas for custody-related entities and enum values
 */

import { z } from 'zod';
import { Custodian, PaymentFrequency, CustodyServiceType } from '../enums';

// Enum validation schemas
export const CustodianEnumSchema = z.string().refine(
  (value) => Custodian.values().some(custodian => 
    custodian.value === value || custodian.name === value
  ),
  {
    message: "Invalid custodian. Must be one of: " + Custodian.values().map(c => c.name).join(', ')
  }
);

export const PaymentFrequencyEnumSchema = z.string().refine(
  (value) => PaymentFrequency.values().some(frequency => frequency.value === value),
  {
    message: "Invalid payment frequency. Must be one of: " + PaymentFrequency.values().map(pf => pf.value).join(', ')
  }
);

export const CustodyServiceTypeEnumSchema = z.string().refine(
  (value) => CustodyServiceType.values().some(type => type.value === value),
  {
    message: "Invalid custody service type. Must be one of: " + CustodyServiceType.values().map(cst => cst.value).join(', ')
  }
);

// Helper functions to get enum instances
export const getCustodianByValue = (value: string): Custodian | undefined => {
  return Custodian.values().find(custodian => 
    custodian.value === value || custodian.name === value
  );
};

export const getPaymentFrequencyByValue = (value: string): PaymentFrequency | undefined => {
  return PaymentFrequency.values().find(frequency => frequency.value === value);
};

export const getCustodyServiceTypeByValue = (value: string): CustodyServiceType | undefined => {
  return CustodyServiceType.values().find(type => type.value === value);
};

// Core Entity Schemas

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
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
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
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});

// Custody Assignment Schema (for linking positions to custody services)
export const CustodyAssignmentSchema = z.object({
  id: z.string().uuid(),
  positionId: z.string().uuid('Position ID must be a valid UUID'),
  custodyServiceId: z.string().uuid('Custody Service ID must be a valid UUID'),
  custodyService: CustodyServiceSchema.optional(), // Populated when joining
  assignedDate: z.coerce.date(),
  quantity: z.number().min(0),
  storageLocation: z.string().optional(),
  certificateNumber: z.string().optional(),
  status: z.enum(['active', 'pending', 'transferred', 'withdrawn']).default('active'),
  notes: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});

// Export enum classes for convenience
export { Custodian, PaymentFrequency, CustodyServiceType };
