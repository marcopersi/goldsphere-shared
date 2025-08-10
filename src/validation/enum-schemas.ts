/**
 * Enum Validation Schemas for GoldSphere Reference Data
 * 
 * Zod schemas that validate against our class-based enums
 */

import { z } from 'zod';
import { Metal, ProductType, Country, Currency, Producer } from '../enums';

// Enum validation schemas using class-based enums
export const MetalEnumSchema = z.string().refine(
  (value) => Metal.values().some((metal: Metal) => 
    metal.symbol.toLowerCase() === value.toLowerCase() || 
    metal.name.toLowerCase() === value.toLowerCase()
  ),
  {
    message: "Invalid metal. Must be one of: " + Metal.values().map((m: Metal) => `${m.name} (${m.symbol})`).join(', ')
  }
);

export const ProductTypeEnumSchema = z.string().refine(
  (value) => ProductType.values().some((type: ProductType) => 
    type.name.toLowerCase() === value.toLowerCase()
  ),
  {
    message: "Invalid product type. Must be one of: " + ProductType.values().map((pt: ProductType) => pt.name).join(', ')
  }
);

export const CountryEnumSchema = z.string().refine(
  (value) => Country.values().some((country: Country) => 
    country.isoCode2.toLowerCase() === value.toLowerCase() || 
    country.code.toLowerCase() === value.toLowerCase() ||
    country.name.toLowerCase() === value.toLowerCase()
  ),
  {
    message: "Invalid country. Must be a valid ISO country code or name. Available: " + 
             Country.values().map((c: Country) => `${c.name} (${c.isoCode2})`).join(', ')
  }
);

export const CurrencyEnumSchema = z.string().refine(
  (value) => Currency.values().some((currency: Currency) => 
    currency.countryCode.toLowerCase() === value.toLowerCase() || 
    currency.isoCode3.toLowerCase() === value.toLowerCase() ||
    currency.isoNumericCode.toString() === value
  ),
  {
    message: "Invalid currency. Must be one of: " + Currency.values().map((c: Currency) => c.isoCode3).join(', ')
  }
);

export const ProducerEnumSchema = z.string().refine(
  (value) => Producer.values().some((producer: Producer) => 
    producer.code.toLowerCase() === value.toLowerCase() ||
    producer.name.toLowerCase() === value.toLowerCase()
  ),
  {
    message: "Invalid producer. Must be one of: " + Producer.values().map((p: Producer) => `${p.name} (${p.code})`).join(', ')
  }
);

// Helper functions to get enum instances
export const getMetalByValue = (value: string): Metal | undefined => {
  return Metal.values().find((metal: Metal) => 
    metal.symbol.toLowerCase() === value.toLowerCase() || 
    metal.name.toLowerCase() === value.toLowerCase()
  );
};

export const getProductTypeByValue = (value: string): ProductType | undefined => {
  return ProductType.values().find((type: ProductType) => 
    type.name.toLowerCase() === value.toLowerCase()
  );
};

export const getCountryByValue = (value: string): Country | undefined => {
  return Country.values().find((country: Country) => 
    country.isoCode2.toLowerCase() === value.toLowerCase() || 
    country.code.toLowerCase() === value.toLowerCase() ||
    country.name.toLowerCase() === value.toLowerCase()
  );
};

export const getCurrencyByValue = (value: string): Currency | undefined => {
  return Currency.values().find((currency: Currency) => 
    currency.countryCode.toLowerCase() === value.toLowerCase() || 
    currency.isoCode3.toLowerCase() === value.toLowerCase() ||
    currency.isoNumericCode.toString() === value
  );
};

export const getProducerByValue = (value: string): Producer | undefined => {
  return Producer.values().find((producer: Producer) => 
    producer.code.toLowerCase() === value.toLowerCase() ||
    producer.name.toLowerCase() === value.toLowerCase()
  );
};

// Export all enum classes for convenience
export { Metal, ProductType, Country, Currency, Producer };
