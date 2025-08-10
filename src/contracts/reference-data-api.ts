/**
 * Reference Data API Contract for GoldSphere Platform
 * 
 * Provides endpoints and types for retrieving reference data
 * such as metals, product types, countries, currencies, and producers.
 */

import { Metal, ProductType, Country, Currency, Producer } from '../enums';

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

export interface ProducerReference {
  code: string;
  name: string;
  countryCode: string;
}

// Main Reference Data Response
export interface ReferenceDataResponse {
  success: boolean;
  data: {
    metals: MetalReference[];
    productTypes: ProductTypeReference[];
    countries: CountryReference[];
    currencies: CurrencyReference[];
    producers: ProducerReference[];
  };
  error?: string;
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

export interface ProducersResponse {
  success: boolean;
  data: ProducerReference[];
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

  /**
   * Get all producers/mints
   */
  getProducers(): Promise<ProducersResponse>;

  /**
   * Get producers by country
   */
  getProducersByCountry(countryCode: string): Promise<ProducersResponse>;
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
  getProducers(): Promise<ProducersResponse>;
  getProducersByCountry(countryCode: string): Promise<ProducersResponse>;
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
   * Get producers reference data
   */
  getProducers(): ProducerReference[];

  /**
   * Get producers by country
   */
  getProducersByCountry(countryCode: string): ProducerReference[];

  /**
   * Validate and get enum instance by value
   */
  getMetalByValue(value: string): Metal | undefined;
  getProductTypeByValue(value: string): ProductType | undefined;
  getCountryByValue(value: string): Country | undefined;
  getCurrencyByValue(value: string): Currency | undefined;
  getProducerByValue(value: string): Producer | undefined;
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
        producers: this.getProducers(),
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

  getProducers(): ProducerReference[] {
    return Producer.values().map((producer: Producer) => producer.toJSON());
  }

  getProducersByCountry(countryCode: string): ProducerReference[] {
    return Producer.fromCountry(countryCode).map((producer: Producer) => producer.toJSON());
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

  getProducerByValue(value: string): Producer | undefined {
    return Producer.fromCode(value) || Producer.fromName(value);
  }
}

// API Endpoints Constants
export const REFERENCE_DATA_ENDPOINTS = {
  ALL: '/api/reference-data',
  METALS: '/api/reference-data/metals',
  PRODUCT_TYPES: '/api/reference-data/product-types',
  COUNTRIES: '/api/reference-data/countries',
  CURRENCIES: '/api/reference-data/currencies',
  PRODUCERS: '/api/reference-data/producers',
  PRODUCERS_BY_COUNTRY: '/api/reference-data/producers/country/:countryCode'
} as const;

export type ReferenceDataEndpoint = typeof REFERENCE_DATA_ENDPOINTS[keyof typeof REFERENCE_DATA_ENDPOINTS];
