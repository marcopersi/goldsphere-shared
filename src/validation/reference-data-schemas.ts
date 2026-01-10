/**
 * Reference Data Validation Schemas - Database Aligned
 * 
 * Zod schemas for validating reference data API responses
 * Aligned with actual database structure and API implementation
 */

import { z } from 'zod';

// =============================================================================
// CORRECTED REFERENCE DATA SCHEMAS
// =============================================================================

// Metal reference schema (matches enum structure)
export const MetalReferenceSchema = z.object({
  symbol: z.string().length(2), // Chemical symbol (AU, AG, PT, PD)
  name: z.string(),              // Full name (Gold, Silver, etc.)
});

// Product type reference schema (matches enum structure)  
export const ProductTypeReferenceSchema = z.object({
  name: z.string(), // Type name (Coin, Bar, Cast Bar, etc.)
});

// Country reference schema (matches API field names)
export const CountryReferenceSchema = z.object({
  code: z.string().length(2).toLowerCase(), // ISO 3166-1 alpha-2 (lowercase)
  name: z.string(),                         // Country name
});

// Currency reference schema (matches database structure)
export const CurrencyReferenceSchema = z.object({
  isoCode2: z.string().length(2),     // 2-letter ISO code  
  isoCode3: z.string().length(3),     // 3-letter ISO code (USD, EUR, etc.)
  isoNumericCode: z.number().int(),   // Numeric ISO code (840 for USD)
});

// Custodian reference schema (enum-based)
export const CustodianReferenceSchema = z.object({
  value: z.string(), // Custodian identifier/code
  name: z.string(),  // Display name
});

// Payment frequency reference schema (enum-based)
export const PaymentFrequencyReferenceSchema = z.object({
  value: z.string(),         // Frequency code (daily, weekly, monthly, etc.)
  displayName: z.string(),   // Human-readable name
  description: z.string(),   // Detailed description
});

// Custody service type reference schema (enum-based)
export const CustodyServiceTypeReferenceSchema = z.object({
  value: z.string(),       // Service type code
  displayName: z.string(), // Human-readable name  
  description: z.string(), // Detailed description
});

// =============================================================================
// DATABASE-SPECIFIC SCHEMAS (for individual table operations)
// =============================================================================

// Metal database record schema
export const MetalDatabaseRecordSchema = z.object({
  id: z.string().uuid(),
  metalName: z.string(),
  symbol: z.string().length(2).optional(), // May not be in database
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

// Product type database record schema
export const ProductTypeDatabaseRecordSchema = z.object({
  id: z.string().uuid(),
  productTypeName: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

// Country database record schema (unified for issuing countries and producer countries)
export const CountryDatabaseRecordSchema = z.object({
  id: z.string().uuid(),
  countryName: z.string(), // Unified name field (was: issuingCountryName)
  isoCode2: z.string().length(2),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

// Currency database record schema
export const CurrencyDatabaseRecordSchema = z.object({
  id: z.string().uuid(),
  isoCode2: z.string().length(2),
  isoCode3: z.string().length(3),
  isoNumericCode: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

// =============================================================================
// MAIN REFERENCE DATA RESPONSE SCHEMAS
// =============================================================================

// Main reference data response schema (matches current API)
export const ReferenceDataResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    metals: z.array(MetalReferenceSchema),
    productTypes: z.array(ProductTypeReferenceSchema),
    countries: z.array(CountryReferenceSchema),
    currencies: z.array(CurrencyReferenceSchema),
    custodians: z.array(CustodianReferenceSchema),
    paymentFrequencies: z.array(PaymentFrequencyReferenceSchema),
    custodyServiceTypes: z.array(CustodyServiceTypeReferenceSchema),
  }),
});

// Individual response schemas (for dedicated endpoints)
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

// =============================================================================
// DATABASE OPERATION RESPONSE SCHEMAS
// =============================================================================

// Database record response schemas (for CRUD operations)
export const MetalDatabaseResponseSchema = z.object({
  success: z.boolean(),
  data: MetalDatabaseRecordSchema.optional(),
  error: z.string().optional(),
  details: z.string().optional(),
});

export const ProductTypeDatabaseResponseSchema = z.object({
  success: z.boolean(),
  data: ProductTypeDatabaseRecordSchema.optional(),
  error: z.string().optional(),
  details: z.string().optional(),
});

export const CountryDatabaseResponseSchema = z.object({
  success: z.boolean(),
  data: CountryDatabaseRecordSchema.optional(),
  error: z.string().optional(),
  details: z.string().optional(),
});

export const CurrencyDatabaseResponseSchema = z.object({
  success: z.boolean(),
  data: CurrencyDatabaseRecordSchema.optional(),
  error: z.string().optional(),
  details: z.string().optional(),
});

// =============================================================================
// BULK OPERATION SCHEMAS
// =============================================================================

// Bulk reference data management
export const BulkReferenceDataUpdateSchema = z.object({
  metals: z.array(MetalDatabaseRecordSchema.omit({ id: true, createdAt: true, updatedAt: true })).optional(),
  productTypes: z.array(ProductTypeDatabaseRecordSchema.omit({ id: true, createdAt: true, updatedAt: true })).optional(),
  countries: z.array(CountryDatabaseRecordSchema.omit({ id: true, createdAt: true, updatedAt: true })).optional(),
  currencies: z.array(CurrencyDatabaseRecordSchema.omit({ id: true, createdAt: true, updatedAt: true })).optional(),
});

// =============================================================================
// ERROR HANDLING SCHEMAS
// =============================================================================

export const ReferenceDataErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  details: z.string().optional(),
  code: z.string().optional(),
  timestamp: z.string().datetime().optional(),
});

// =============================================================================
// EXPORT TYPES
// =============================================================================

export type MetalReference = z.infer<typeof MetalReferenceSchema>;
export type ProductTypeReference = z.infer<typeof ProductTypeReferenceSchema>;
export type CountryReference = z.infer<typeof CountryReferenceSchema>;
export type CurrencyReference = z.infer<typeof CurrencyReferenceSchema>;
export type CustodianReference = z.infer<typeof CustodianReferenceSchema>;
export type PaymentFrequencyReference = z.infer<typeof PaymentFrequencyReferenceSchema>;
export type CustodyServiceTypeReference = z.infer<typeof CustodyServiceTypeReferenceSchema>;

// Response types
export type ReferenceDataResponse = z.infer<typeof ReferenceDataResponseSchema>;
export type MetalsResponse = z.infer<typeof MetalsResponseSchema>;
export type ProductTypesResponse = z.infer<typeof ProductTypesResponseSchema>;
export type CountriesResponse = z.infer<typeof CountriesResponseSchema>;
export type CurrenciesResponse = z.infer<typeof CurrenciesResponseSchema>;
export type CustodiansResponse = z.infer<typeof CustodiansResponseSchema>;
export type PaymentFrequenciesResponse = z.infer<typeof PaymentFrequenciesResponseSchema>;
export type CustodyServiceTypesResponse = z.infer<typeof CustodyServiceTypesResponseSchema>;

// Database record types
export type MetalDatabaseRecord = z.infer<typeof MetalDatabaseRecordSchema>;
export type ProductTypeDatabaseRecord = z.infer<typeof ProductTypeDatabaseRecordSchema>;
export type CountryDatabaseRecord = z.infer<typeof CountryDatabaseRecordSchema>;
export type CurrencyDatabaseRecord = z.infer<typeof CurrencyDatabaseRecordSchema>;

// Database response types
export type MetalDatabaseResponse = z.infer<typeof MetalDatabaseResponseSchema>;
export type ProductTypeDatabaseResponse = z.infer<typeof ProductTypeDatabaseResponseSchema>;
export type CountryDatabaseResponse = z.infer<typeof CountryDatabaseResponseSchema>;
export type CurrencyDatabaseResponse = z.infer<typeof CurrencyDatabaseResponseSchema>;

// Bulk operation types
export type BulkReferenceDataUpdate = z.infer<typeof BulkReferenceDataUpdateSchema>;

// Error types
export type ReferenceDataError = z.infer<typeof ReferenceDataErrorSchema>;

// =============================================================================
// HELPER SCHEMAS FOR VALIDATION
// =============================================================================

// Validation helper for metal symbols
export const MetalSymbolValidationSchema = z.string().refine(
  (symbol) => ['AU', 'AG', 'PT', 'PD'].includes(symbol),
  {
    message: "Invalid metal symbol - must be AU, AG, PT, or PD"
  }
);

// Validation helper for currency codes
export const CurrencyCodeValidationSchema = z.string().refine(
  (code) => ['USD', 'EUR', 'GBP', 'CHF', 'CAD', 'AUD'].includes(code),
  {
    message: "Invalid currency code"
  }
);
