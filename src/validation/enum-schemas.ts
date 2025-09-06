/**
 * Optimized Enum Validation Schemas for GoldSphere Reference Data
 * 
 * High-performance Zod schemas with proper API abstraction
 * Optimized for validation speed and memory efficiency
 */

import { z } from 'zod';

// =============================================================================
// PERFORMANCE-OPTIMIZED ENUM VALIDATION
// =============================================================================

// Cache enum values for performance (computed once, reused many times)
let _metalCache: { symbols: Set<string>; names: Set<string> } | null = null;
let _productTypeCache: Set<string> | null = null;
let _countryCache: { codes: Set<string>; isoCodes: Set<string>; names: Set<string> } | null = null;
let _currencyCache: { countryCodes: Set<string>; isoCodes: Set<string>; numericCodes: Set<string> } | null = null;
let _producerCache: { codes: Set<string>; names: Set<string> } | null = null;
let _orderTypeCache: Set<string> | null = null;
let _orderStatusCache: Set<string> | null = null;
let _orderSourceCache: Set<string> | null = null;

// Lazy initialization functions for caches
const getMetalCache = () => {
  if (!_metalCache) {
    try {
      const { Metal } = require('../enums');
      const values = Metal.values();
      _metalCache = {
        symbols: new Set(values.map((m: any) => m.symbol.toLowerCase())),
        names: new Set(values.map((m: any) => m.name.toLowerCase()))
      };
    } catch (error) {
      console.warn('Failed to load Metal enum, falling back to hardcoded values', error);
      _metalCache = {
        symbols: new Set(['au', 'ag', 'pt', 'pd']),
        names: new Set(['gold', 'silver', 'platinum', 'palladium'])
      };
    }
  }
  return _metalCache;
};

const getProductTypeCache = () => {
  if (!_productTypeCache) {
    try {
      const { ProductType } = require('../enums');
      const values = ProductType.values();
      _productTypeCache = new Set(values.map((pt: any) => pt.name.toLowerCase()));
    } catch (error) {
      console.warn('Failed to load ProductType enum, falling back to hardcoded values', error);
      _productTypeCache = new Set(['coin', 'bar', 'cast bar', 'minted bar', 'combibar', 'medallion', 'jewelry']);
    }
  }
  return _productTypeCache;
};

const getCountryCache = () => {
  if (!_countryCache) {
    try {
      const { Country } = require('../enums');
      const values = Country.values();
      _countryCache = {
        codes: new Set(values.map((c: any) => c.code.toLowerCase())),
        isoCodes: new Set(values.map((c: any) => c.isoCode2.toLowerCase())),
        names: new Set(values.map((c: any) => c.name.toLowerCase()))
      };
    } catch (error) {
      console.warn('Failed to load Country enum, falling back to hardcoded values', error);
      _countryCache = {
        codes: new Set(['us', 'ca', 'gb', 'de', 'fr', 'au', 'ch']),
        isoCodes: new Set(['us', 'ca', 'gb', 'de', 'fr', 'au', 'ch']),
        names: new Set(['united states', 'canada', 'united kingdom', 'germany', 'france', 'australia', 'switzerland'])
      };
    }
  }
  return _countryCache;
};

const getCurrencyCache = () => {
  if (!_currencyCache) {
    try {
      const { Currency } = require('../enums');
      const values = Currency.values();
      _currencyCache = {
        countryCodes: new Set(values.map((c: any) => c.countryCode.toLowerCase())),
        isoCodes: new Set(values.map((c: any) => c.isoCode3.toLowerCase())),
        numericCodes: new Set(values.map((c: any) => c.isoNumericCode.toString()))
      };
    } catch (error) {
      console.warn('Failed to load Currency enum, falling back to hardcoded values', error);
      _currencyCache = {
        countryCodes: new Set(['us', 'eu', 'gb', 'ch', 'ca', 'au']),
        isoCodes: new Set(['usd', 'eur', 'gbp', 'chf', 'cad', 'aud']),
        numericCodes: new Set(['840', '978', '826', '756', '124', '036'])
      };
    }
  }
  return _currencyCache;
};

const getProducerCache = () => {
  if (!_producerCache) {
    try {
      const { Producer } = require('../enums');
      const values = Producer.values();
      _producerCache = {
        codes: new Set(values.map((p: any) => p.code.toLowerCase())),
        names: new Set(values.map((p: any) => p.name.toLowerCase()))
      };
    } catch (error) {
      console.warn('Failed to load Producer enum, falling back to hardcoded values', error);
      _producerCache = {
        codes: new Set(['rcm', 'usmint', 'perth', 'valcambi', 'pamp']),
        names: new Set(['royal canadian mint', 'us mint', 'perth mint', 'valcambi', 'pamp suisse'])
      };
    }
  }
  return _producerCache;
};

const getOrderTypeCache = () => {
  if (!_orderTypeCache) {
    try {
      const { OrderType } = require('../enums');
      const values = OrderType.values();
      _orderTypeCache = new Set(values.map((ot: any) => ot.value.toLowerCase()));
    } catch (error) {
      console.warn('Failed to load OrderType enum, falling back to hardcoded values', error);
      _orderTypeCache = new Set(['buy', 'sell']);
    }
  }
  return _orderTypeCache;
};

const getOrderStatusCache = () => {
  if (!_orderStatusCache) {
    try {
      const { OrderStatus } = require('../enums');
      const values = OrderStatus.values();
      _orderStatusCache = new Set(values.map((os: any) => os.value.toLowerCase()));
    } catch (error) {
      console.warn('Failed to load OrderStatus enum, falling back to hardcoded values', error);
      _orderStatusCache = new Set(['pending', 'processing', 'shipped', 'delivered', 'cancelled']);
    }
  }
  return _orderStatusCache;
};

const getOrderSourceCache = () => {
  if (!_orderSourceCache) {
    try {
      const { OrderSource } = require('../enums');
      const values = OrderSource.values();
      _orderSourceCache = new Set(values.map((os: any) => os.value.toLowerCase()));
    } catch (error) {
      console.warn('Failed to load OrderSource enum, falling back to hardcoded values', error);
      _orderSourceCache = new Set(['web', 'mobile', 'api', 'admin', 'import', 'phone']);
    }
  }
  return _orderSourceCache;
};

// =============================================================================
// OPTIMIZED ENUM VALIDATION SCHEMAS
// =============================================================================

// Metal validation (accepts symbol OR name, optimized for API abstraction)
export const MetalEnumSchema = z.string().refine(
  (value) => {
    const cache = getMetalCache();
    const normalized = value.toLowerCase().trim();
    return cache.symbols.has(normalized) || cache.names.has(normalized);
  },
  {
    message: "Invalid metal. Must be a valid metal symbol (AU, AG, PT, PD) or name (Gold, Silver, Platinum, Palladium)"
  }
);

// Product type validation (API-focused, accepts common names)
export const ProductTypeEnumSchema = z.string().refine(
  (value) => {
    const cache = getProductTypeCache();
    const normalized = value.toLowerCase().trim();
    return cache.has(normalized);
  },
  {
    message: "Invalid product type. Must be one of: Coin, Bar, Cast Bar, Minted Bar, CombiBar, Medallion, Jewelry"
  }
);

// Country validation (flexible: accepts ISO code OR name)
export const CountryEnumSchema = z.string().refine(
  (value) => {
    const cache = getCountryCache();
    const normalized = value.toLowerCase().trim();
    return cache.codes.has(normalized) || cache.isoCodes.has(normalized) || cache.names.has(normalized);
  },
  {
    message: "Invalid country. Must be a valid ISO country code or country name"
  }
);

// Currency validation (API-focused: accepts ISO3 code primarily)
export const CurrencyEnumSchema = z.string().refine(
  (value) => {
    const cache = getCurrencyCache();
    const normalized = value.toLowerCase().trim();
    // Primary validation: ISO3 codes (most common in APIs)
    return cache.isoCodes.has(normalized) || 
           cache.countryCodes.has(normalized) || 
           cache.numericCodes.has(value.trim());
  },
  {
    message: "Invalid currency. Must be a valid ISO currency code (USD, EUR, GBP, CHF, CAD, AUD)"
  }
);

// Producer validation (accepts code OR name)
export const ProducerEnumSchema = z.string().refine(
  (value) => {
    const cache = getProducerCache();
    const normalized = value.toLowerCase().trim();
    return cache.codes.has(normalized) || cache.names.has(normalized);
  },
  {
    message: "Invalid producer. Must be a valid producer code or name"
  }
);

// Order type validation (simple, API-focused)
export const OrderTypeEnumSchema = z.string().refine(
  (value) => {
    const cache = getOrderTypeCache();
    const normalized = value.toLowerCase().trim();
    return cache.has(normalized);
  },
  {
    message: "Invalid order type. Must be 'buy' or 'sell'"
  }
);

// Order status validation (workflow-focused)
export const OrderStatusEnumSchema = z.string().refine(
  (value) => {
    const cache = getOrderStatusCache();
    const normalized = value.toLowerCase().trim();
    return cache.has(normalized);
  },
  {
    message: "Invalid order status. Must be one of: pending, processing, shipped, delivered, cancelled"
  }
);

// Order source validation (channel-focused)
export const OrderSourceEnumSchema = z.string().refine(
  (value) => {
    const cache = getOrderSourceCache();
    const normalized = value.toLowerCase().trim();
    return cache.has(normalized);
  },
  {
    message: "Invalid order source. Must be one of: web, mobile, api, admin, import, phone"
  }
);

// =============================================================================
// API-OPTIMIZED HELPER FUNCTIONS
// =============================================================================

// High-performance lookup functions with caching
export const getMetalByValue = (value: string): any => {
  try {
    const { Metal } = require('../enums');
    const normalized = value.toLowerCase().trim();
    return Metal.values().find((metal: any) => 
      metal.symbol.toLowerCase() === normalized || 
      metal.name.toLowerCase() === normalized
    );
  } catch (error) {
    console.warn('Failed to load Metal enum for lookup', error);
    return undefined;
  }
};

export const getProductTypeByValue = (value: string): any => {
  try {
    const { ProductType } = require('../enums');
    const normalized = value.toLowerCase().trim();
    return ProductType.values().find((type: any) => 
      type.name.toLowerCase() === normalized
    );
  } catch (error) {
    console.warn('Failed to load ProductType enum for lookup', error);
    return undefined;
  }
};

export const getCountryByValue = (value: string): any => {
  try {
    const { Country } = require('../enums');
    const normalized = value.toLowerCase().trim();
    return Country.values().find((country: any) => 
      country.isoCode2.toLowerCase() === normalized || 
      country.code.toLowerCase() === normalized ||
      country.name.toLowerCase() === normalized
    );
  } catch (error) {
    console.warn('Failed to load Country enum for lookup', error);
    return undefined;
  }
};

export const getCurrencyByValue = (value: string): any => {
  try {
    const { Currency } = require('../enums');
    const normalized = value.toLowerCase().trim();
    return Currency.values().find((currency: any) => 
      currency.countryCode.toLowerCase() === normalized || 
      currency.isoCode3.toLowerCase() === normalized ||
      currency.isoNumericCode.toString() === value.trim()
    );
  } catch (error) {
    console.warn('Failed to load Currency enum for lookup', error);
    return undefined;
  }
};

export const getProducerByValue = (value: string): any => {
  try {
    const { Producer } = require('../enums');
    const normalized = value.toLowerCase().trim();
    return Producer.values().find((producer: any) => 
      producer.code.toLowerCase() === normalized ||
      producer.name.toLowerCase() === normalized
    );
  } catch (error) {
    console.warn('Failed to load Producer enum for lookup', error);
    return undefined;
  }
};

export const getOrderTypeByValue = (value: string): any => {
  try {
    const { OrderType } = require('../enums');
    const normalized = value.toLowerCase().trim();
    return OrderType.values().find((orderType: any) => 
      orderType.value.toLowerCase() === normalized
    );
  } catch (error) {
    console.warn('Failed to load OrderType enum for lookup', error);
    return undefined;
  }
};

export const getOrderStatusByValue = (value: string): any => {
  try {
    const { OrderStatus } = require('../enums');
    const normalized = value.toLowerCase().trim();
    return OrderStatus.values().find((orderStatus: any) => 
      orderStatus.value.toLowerCase() === normalized
    );
  } catch (error) {
    console.warn('Failed to load OrderStatus enum for lookup', error);
    return undefined;
  }
};

export const getOrderSourceByValue = (value: string): any => {
  try {
    const { OrderSource } = require('../enums');
    const normalized = value.toLowerCase().trim();
    return OrderSource.values().find((orderSource: any) => 
      orderSource.value.toLowerCase() === normalized
    );
  } catch (error) {
    console.warn('Failed to load OrderSource enum for lookup', error);
    return undefined;
  }
};

// =============================================================================
// API ABSTRACTION SCHEMAS
// =============================================================================

// Simplified API schemas that hide enum complexity from clients
export const MetalApiSchema = z.union([
  z.literal('gold'),
  z.literal('silver'), 
  z.literal('platinum'),
  z.literal('palladium'),
  z.literal('AU'),
  z.literal('AG'),
  z.literal('PT'),
  z.literal('PD')
]).transform((value) => {
  // Always return the full name for API consistency
  const metalMap: Record<string, string> = {
    'gold': 'Gold', 'au': 'Gold',
    'silver': 'Silver', 'ag': 'Silver',
    'platinum': 'Platinum', 'pt': 'Platinum', 
    'palladium': 'Palladium', 'pd': 'Palladium'
  };
  return metalMap[value.toLowerCase()] || value;
});

export const CurrencyApiSchema = z.union([
  z.literal('USD'),
  z.literal('EUR'),
  z.literal('GBP'), 
  z.literal('CHF'),
  z.literal('CAD'),
  z.literal('AUD')
]).transform((value) => value.toUpperCase());

export const OrderTypeApiSchema = z.union([
  z.literal('buy'),
  z.literal('sell')
]).transform((value) => value.toLowerCase());

export const OrderStatusApiSchema = z.union([
  z.literal('pending'),
  z.literal('processing'),
  z.literal('shipped'),
  z.literal('delivered'),
  z.literal('cancelled')
]).transform((value) => value.toLowerCase());

// =============================================================================
// CACHE MANAGEMENT
// =============================================================================

// Function to clear caches (useful for testing or hot reloading)
export const clearEnumCaches = (): void => {
  _metalCache = null;
  _productTypeCache = null;
  _countryCache = null;
  _currencyCache = null;
  _producerCache = null;
  _orderTypeCache = null;
  _orderStatusCache = null;
  _orderSourceCache = null;
};

// Function to pre-warm caches (useful for production startup)
export const preWarmEnumCaches = (): void => {
  getMetalCache();
  getProductTypeCache();
  getCountryCache();
  getCurrencyCache();
  getProducerCache();
  getOrderTypeCache();
  getOrderStatusCache();
  getOrderSourceCache();
};

// =============================================================================
// ENUM INSTANCE VALIDATION (for internal use)
// =============================================================================

// Validate that we receive actual enum instances (not just strings)
export const MetalInstanceSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  toString: z.function().optional()
});

export const OrderTypeInstanceSchema = z.object({
  value: z.string(),
  displayName: z.string(),
  toString: z.function().optional()
});

export const OrderStatusInstanceSchema = z.object({
  value: z.string(),
  displayName: z.string(),
  description: z.string(),
  toString: z.function().optional()
});

export const OrderSourceInstanceSchema = z.object({
  value: z.string(),
  displayName: z.string(),
  description: z.string(),
  toString: z.function().optional()
});

// =============================================================================
// EXPORT ALL ENUM CLASSES (with error handling)
// =============================================================================

// Safe exports with fallbacks using IIFEs to keep bindings const
export const Metal = (() => {
  try {
    const enums = require('../enums');
    return enums.Metal;
  } catch (error) {
    console.warn('Failed to load enum classes (Metal)', error);
    return undefined;
  }
})();

export const ProductType = (() => {
  try {
    const enums = require('../enums');
    return enums.ProductType;
  } catch (error) {
    console.warn('Failed to load enum classes (ProductType)', error);
    return undefined;
  }
})();

export const Country = (() => {
  try {
    const enums = require('../enums');
    return enums.Country;
  } catch (error) {
    console.warn('Failed to load enum classes (Country)', error);
    return undefined;
  }
})();

export const Currency = (() => {
  try {
    const enums = require('../enums');
    return enums.Currency;
  } catch (error) {
    console.warn('Failed to load enum classes (Currency)', error);
    return undefined;
  }
})();

export const Producer = (() => {
  try {
    const enums = require('../enums');
    return enums.Producer;
  } catch (error) {
    console.warn('Failed to load enum classes (Producer)', error);
    return undefined;
  }
})();

export const OrderType = (() => {
  try {
    const enums = require('../enums');
    return enums.OrderType;
  } catch (error) {
    console.warn('Failed to load enum classes (OrderType)', error);
    return undefined;
  }
})();

export const OrderStatus = (() => {
  try {
    const enums = require('../enums');
    return enums.OrderStatus;
  } catch (error) {
    console.warn('Failed to load enum classes (OrderStatus)', error);
    return undefined;
  }
})();

export const OrderSource = (() => {
  try {
    const enums = require('../enums');
    return enums.OrderSource;
  } catch (error) {
    console.warn('Failed to load enum classes (OrderSource)', error);
    return undefined;
  }
})();

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type MetalApiType = z.infer<typeof MetalApiSchema>;
export type CurrencyApiType = z.infer<typeof CurrencyApiSchema>;
export type OrderTypeApiType = z.infer<typeof OrderTypeApiSchema>;
export type OrderStatusApiType = z.infer<typeof OrderStatusApiSchema>;
export type OrderSourceApiType = z.infer<typeof OrderSourceEnumSchema>;
