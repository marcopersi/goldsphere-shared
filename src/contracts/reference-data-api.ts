/**
 * Reference Data API Contract for GoldSphere Platform
 * 
 * Provides endpoints and types for retrieving reference data
 * such as metals, product types, countries, currencies, and producers.
 */

import { Metal, ProductType, Country, Currency, Custodian, PaymentFrequency, CustodyServiceType } from '../enums';

// Reference Data Response Types
export interface MetalReference {
  symbol: string;
  name: string;
}

export interface ProductTypeReference {
  name: string;
}

export interface CountryReference {
  code: string;
  name: string;
}

export interface CurrencyReference {
  countryCode: string;
  isoCode3: string;
  isoNumericCode: number;
}

export interface CustodianReference {
  name: string;
  description?: string;
}

export interface PaymentFrequencyReference {
  value: string;
  label: string;
  durationDays: number;
}

export interface CustodyServiceTypeReference {
  name: string;
  description?: string;
}

// Main Reference Data Response
export interface ReferenceDataResponse {
  success: boolean;
  data: {
    metals: MetalReference[];
    productTypes: ProductTypeReference[];
    countries: CountryReference[];
    currencies: CurrencyReference[];
    custodians: CustodianReference[];
    paymentFrequencies: PaymentFrequencyReference[];
    custodyServiceTypes: CustodyServiceTypeReference[];
  };
}

// Specific reference data responses for individual endpoints
export interface MetalsResponse {
  success: boolean;
  data: MetalReference[];
  error?: string;
}

export interface ProductTypesResponse {
  success: boolean;
  data: ProductTypeReference[];
  error?: string;
}

export interface CountriesResponse {
  success: boolean;
  data: CountryReference[];
  error?: string;
}

export interface CurrenciesResponse {
  success: boolean;
  data: CurrencyReference[];
  error?: string;
}

export interface CustodiansResponse {
  success: boolean;
  data: CustodianReference[];
  error?: string;
}

export interface PaymentFrequenciesResponse {
  success: boolean;
  data: PaymentFrequencyReference[];
  error?: string;
}

export interface CustodyServiceTypesResponse {
  success: boolean;
  data: CustodyServiceTypeReference[];
  error?: string;
}

// API Contract Interface
export interface ReferenceDataApiContract {
  /**
   * Get all reference data in a single request
   */
  getAllReferenceData(): Promise<ReferenceDataResponse>;

  /**
   * Get all supported metals
   */
  getMetals(): Promise<MetalsResponse>;

  /**
   * Get all product types
   */
  getProductTypes(): Promise<ProductTypesResponse>;

  /**
   * Get all supported countries
   */
  getCountries(): Promise<CountriesResponse>;

  /**
   * Get all supported currencies
   */
  getCurrencies(): Promise<CurrenciesResponse>;
}

// API Client Interface
export interface ReferenceDataApiClient {
  baseUrl: string;
  timeout: number;
  
  getAllReferenceData(): Promise<ReferenceDataResponse>;
  getMetals(): Promise<MetalsResponse>;
  getProductTypes(): Promise<ProductTypesResponse>;
  getCountries(): Promise<CountriesResponse>;
  getCurrencies(): Promise<CurrenciesResponse>;
  getCustodians(): Promise<CustodiansResponse>;
  getPaymentFrequencies(): Promise<PaymentFrequenciesResponse>;
  getCustodyServiceTypes(): Promise<CustodyServiceTypesResponse>;
}

// Service Interface
export interface ReferenceDataService {
  /**
   * Get all reference data using class-based enums
   */
  getAllReferenceData(): ReferenceDataResponse;

  /**
   * Get metals reference data
   */
  getMetals(): MetalReference[];

  /**
   * Get product types reference data
   */
  getProductTypes(): ProductTypeReference[];

  /**
   * Get countries reference data
   */
  getCountries(): CountryReference[];

  /**
   * Get currencies reference data
   */
  getCurrencies(): CurrencyReference[];

  /**
   * Get custodians reference data
   */
  getCustodians(): CustodianReference[];

  /**
   * Get payment frequencies reference data
   */
  getPaymentFrequencies(): PaymentFrequencyReference[];

  /**
   * Get custody service types reference data
   */
  getCustodyServiceTypes(): CustodyServiceTypeReference[];

  /**
   * Validate and get enum instance by value
   */
  getMetalByValue(value: string): Metal | undefined;
  getProductTypeByValue(value: string): ProductType | undefined;
  getCountryByValue(value: string): Country | undefined;
  getCurrencyByValue(value: string): Currency | undefined;
}

// Default Implementation Helper
export class DefaultReferenceDataService implements ReferenceDataService {
  getAllReferenceData(): ReferenceDataResponse {
    return {
      success: true,
      data: {
        metals: this.getMetals(),
        productTypes: this.getProductTypes(),
        countries: this.getCountries(),
        currencies: this.getCurrencies(),
        custodians: this.getCustodians(),
        paymentFrequencies: this.getPaymentFrequencies(),
        custodyServiceTypes: this.getCustodyServiceTypes(),
      }
    };
  }

  getMetals(): MetalReference[] {
    return Metal.values().map((metal: Metal) => metal.toJSON());
  }

  getProductTypes(): ProductTypeReference[] {
    return ProductType.values().map((type: ProductType) => type.toJSON());
  }

  getCountries(): CountryReference[] {
    return Country.values().map((country: Country) => country.toJSON());
  }

  getCurrencies(): CurrencyReference[] {
    return Currency.values().map((currency: Currency) => currency.toJSON());
  }

  getCustodians(): CustodianReference[] {
    return Custodian.values().map((custodian: Custodian) => ({
      name: custodian.name
    }));
  }

  getPaymentFrequencies(): PaymentFrequencyReference[] {
    return PaymentFrequency.values().map((frequency: PaymentFrequency) => ({
      value: frequency.value,
      label: frequency.displayName,
      durationDays: this.getDurationDaysForFrequency(frequency.value)
    }));
  }

  getCustodyServiceTypes(): CustodyServiceTypeReference[] {
    return CustodyServiceType.values().map((type: CustodyServiceType) => ({
      name: type.value,
      description: type.description
    }));
  }

  private getDurationDaysForFrequency(frequency: string): number {
    switch (frequency) {
      case 'daily': return 1;
      case 'weekly': return 7;
      case 'monthly': return 30;
      case 'quarterly': return 90;
      case 'yearly': return 365;
      default: return 30;
    }
  }

  getMetalByValue(value: string): Metal | undefined {
    return Metal.fromSymbol(value) || Metal.fromName(value);
  }

  getProductTypeByValue(value: string): ProductType | undefined {
    return ProductType.fromName(value);
  }

  getCountryByValue(value: string): Country | undefined {
    return Country.fromIsoCode2(value) || Country.fromName(value);
  }

  getCurrencyByValue(value: string): Currency | undefined {
    return Currency.fromIsoCode3(value) || Currency.fromCountryCode(value) || 
           Currency.fromNumericCode(parseInt(value, 10));
  }
}

// API Endpoints Constants
export const REFERENCE_DATA_ENDPOINTS = {
  ALL: '/api/reference-data',
  METALS: '/api/reference-data/metals',
  PRODUCT_TYPES: '/api/reference-data/product-types',
  COUNTRIES: '/api/reference-data/countries',
  CURRENCIES: '/api/reference-data/currencies'
} as const;

export type ReferenceDataEndpoint = typeof REFERENCE_DATA_ENDPOINTS[keyof typeof REFERENCE_DATA_ENDPOINTS];
