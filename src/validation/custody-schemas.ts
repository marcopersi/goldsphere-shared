/**
 * Custody Validation Schemas for GoldSphere Platform
 * 
 * Zod schemas for validating custody-related enum values
 */

import { z } from 'zod';
import { Custodian, PaymentFrequency, CustodyServiceType } from '../enums';

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

// Export enum classes for convenience
export { Custodian, PaymentFrequency, CustodyServiceType };
