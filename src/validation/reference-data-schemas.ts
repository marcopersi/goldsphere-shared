/**
 * Reference Data Validation Schemas
 * 
 * Zod schemas for validating reference data API responses
 */

import { z } from 'zod';

// Reference data item schemas (simplified data transfer objects)
export const MetalReferenceSchema = z.object({
  symbol: z.string(),
  name: z.string(),
});

export const ProductTypeReferenceSchema = z.object({
  name: z.string(),
});

export const CountryReferenceSchema = z.object({
  name: z.string(),
  countryCode: z.string().length(2),
});

export const CurrencyReferenceSchema = z.object({
  code: z.string().length(3),
  name: z.string(),
  symbol: z.string(),
});

export const ProducerReferenceSchema = z.object({
  code: z.string(),
  name: z.string(),
});

export const CustodianReferenceSchema = z.object({
  value: z.string(),
  name: z.string(),
});

export const PaymentFrequencyReferenceSchema = z.object({
  value: z.string(),
  displayName: z.string(),
  description: z.string(),
});

export const CustodyServiceTypeReferenceSchema = z.object({
  value: z.string(),
  displayName: z.string(),
});

// Main reference data response schema
export const ReferenceDataResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    metals: z.array(MetalReferenceSchema),
    productTypes: z.array(ProductTypeReferenceSchema),
    countries: z.array(CountryReferenceSchema),
    currencies: z.array(CurrencyReferenceSchema),
    producers: z.array(ProducerReferenceSchema),
    custodians: z.array(CustodianReferenceSchema),
    paymentFrequencies: z.array(PaymentFrequencyReferenceSchema),
    custodyServiceTypes: z.array(CustodyServiceTypeReferenceSchema),
  }),
});

// Individual response schemas
export const MetalsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(MetalReferenceSchema),
});

export const ProductTypesResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(ProductTypeReferenceSchema),
});

export const CountriesResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(CountryReferenceSchema),
});

export const CurrenciesResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(CurrencyReferenceSchema),
});

export const ProducersResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(ProducerReferenceSchema),
});

export const CustodiansResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(CustodianReferenceSchema),
});

export const PaymentFrequenciesResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(PaymentFrequencyReferenceSchema),
});

export const CustodyServiceTypesResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(CustodyServiceTypeReferenceSchema),
});

// Export inferred types
export type MetalReference = z.infer<typeof MetalReferenceSchema>;
export type ProductTypeReference = z.infer<typeof ProductTypeReferenceSchema>;
export type CountryReference = z.infer<typeof CountryReferenceSchema>;
export type CurrencyReference = z.infer<typeof CurrencyReferenceSchema>;
export type ProducerReference = z.infer<typeof ProducerReferenceSchema>;
export type CustodianReference = z.infer<typeof CustodianReferenceSchema>;
export type PaymentFrequencyReference = z.infer<typeof PaymentFrequencyReferenceSchema>;
export type CustodyServiceTypeReference = z.infer<typeof CustodyServiceTypeReferenceSchema>;
export type ReferenceDataResponse = z.infer<typeof ReferenceDataResponseSchema>;
export type MetalsResponse = z.infer<typeof MetalsResponseSchema>;
export type ProductTypesResponse = z.infer<typeof ProductTypesResponseSchema>;
export type CountriesResponse = z.infer<typeof CountriesResponseSchema>;
export type CurrenciesResponse = z.infer<typeof CurrenciesResponseSchema>;
export type ProducersResponse = z.infer<typeof ProducersResponseSchema>;
export type CustodiansResponse = z.infer<typeof CustodiansResponseSchema>;
export type PaymentFrequenciesResponse = z.infer<typeof PaymentFrequenciesResponseSchema>;
export type CustodyServiceTypesResponse = z.infer<typeof CustodyServiceTypesResponseSchema>;
