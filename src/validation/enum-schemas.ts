/**
 * Optimized Enum Validation Schemas for GoldSphere Reference Data
 * 
 * High-performance Zod schemas with proper API abstraction
 * Optimized for validation speed and memory efficiency
 */

import { z } from 'zod';

interface EnumWithValues<TValue> {
  values(): TValue[];
}

interface MetalEnumValue {
  symbol: string;
  name: string;
}

interface ProductTypeEnumValue {
  name: string;
}

interface CountryEnumValue {
  code: string;
  isoCode2: string;
  name: string;
}

interface CurrencyEnumValue {
  countryCode: string;
  isoCode3: string;
  isoNumericCode: number | string;
}

interface ValueEnum {
  value: string;
}

interface EnumModule {
  Metal: EnumWithValues<MetalEnumValue>;
  ProductType: EnumWithValues<ProductTypeEnumValue>;
  Country: EnumWithValues<CountryEnumValue>;
  Currency: EnumWithValues<CurrencyEnumValue>;
  Producer?: unknown;
  OrderType: EnumWithValues<ValueEnum>;
  OrderStatus: EnumWithValues<ValueEnum>;
  OrderSource: EnumWithValues<ValueEnum>;
}

const loadEnums = (): EnumModule => require('../enums') as EnumModule;

// =============================================================================
// PERFORMANCE-OPTIMIZED ENUM VALIDATION
// =============================================================================

// Cache enum values for performance (computed once, reused many times)
let _metalCache: { symbols: Set<string>; names: Set<string> } | null = null;
let _productTypeCache: Set<string> | null = null;
let _countryCache: { codes: Set<string>; isoCodes: Set<string>; names: Set<string> } | null = null;
let _currencyCache: { countryCodes: Set<string>; isoCodes: Set<string>; numericCodes: Set<string> } | null = null;
let _orderTypeCache: Set<string> | null = null;
let _orderStatusCache: Set<string> | null = null;
let _orderSourceCache: Set<string> | null = null;

// Lazy initialization functions for caches
const getMetalCache = () => {
  if (!_metalCache) {
    try {
      const { Metal } = loadEnums();
      const values = Metal.values();
      _metalCache = {
        symbols: new Set(values.map((m) => m.symbol.toLowerCase())),
        names: new Set(values.map((m) => m.name.toLowerCase()))
      };
    } catch {
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
      const { ProductType } = loadEnums();
      const values = ProductType.values();
      _productTypeCache = new Set(values.map((pt) => pt.name.toLowerCase()));
    } catch {
      _productTypeCache = new Set(['coin', 'bar', 'cast bar', 'minted bar', 'combibar', 'medallion', 'jewelry']);
    }
  }
  return _productTypeCache;
};

const getCountryCache = () => {
  if (!_countryCache) {
    try {
      const { Country } = loadEnums();
      const values = Country.values();
      _countryCache = {
        codes: new Set(values.map((c) => c.code.toLowerCase())),
        isoCodes: new Set(values.map((c) => c.isoCode2.toLowerCase())),
        names: new Set(values.map((c) => c.name.toLowerCase()))
      };
    } catch {
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
      const { Currency } = loadEnums();
      const values = Currency.values();
      _currencyCache = {
        countryCodes: new Set(values.map((c) => c.countryCode.toLowerCase())),
        isoCodes: new Set(values.map((c) => c.isoCode3.toLowerCase())),
        numericCodes: new Set(values.map((c) => c.isoNumericCode.toString()))
      };
    } catch {
      _currencyCache = {
        countryCodes: new Set(['us', 'eu', 'gb', 'ch', 'ca', 'au']),
        isoCodes: new Set(['usd', 'eur', 'gbp', 'chf', 'cad', 'aud']),
        numericCodes: new Set(['840', '978', '826', '756', '124', '036'])
      };
    }
  }
  return _currencyCache;
};

const getOrderTypeCache = () => {
  if (!_orderTypeCache) {
    try {
      const { OrderType } = loadEnums();
      const values = OrderType.values();
      _orderTypeCache = new Set(values.map((ot) => ot.value.toLowerCase()));
    } catch {
      _orderTypeCache = new Set(['buy', 'sell']);
    }
  }
  return _orderTypeCache;
};

const getOrderStatusCache = () => {
  if (!_orderStatusCache) {
    try {
      const { OrderStatus } = loadEnums();
      const values = OrderStatus.values();
      _orderStatusCache = new Set(values.map((os) => os.value.toLowerCase()));
    } catch {
      _orderStatusCache = new Set(['pending', 'processing', 'shipped', 'delivered', 'cancelled']);
    }
  }
  return _orderStatusCache;
};

const getOrderSourceCache = () => {
  if (!_orderSourceCache) {
    try {
      const { OrderSource } = loadEnums();
      const values = OrderSource.values();
      _orderSourceCache = new Set(values.map((os) => os.value.toLowerCase()));
    } catch {
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
export const getMetalByValue = (value: string): MetalEnumValue | undefined => {
  try {
    const { Metal } = loadEnums();
    const normalized = value.toLowerCase().trim();
    return Metal.values().find((metal) => 
      metal.symbol.toLowerCase() === normalized || 
      metal.name.toLowerCase() === normalized
    );
  } catch {
    return undefined;
  }
};

export const getProductTypeByValue = (value: string): ProductTypeEnumValue | undefined => {
  try {
    const { ProductType } = loadEnums();
    const normalized = value.toLowerCase().trim();
    return ProductType.values().find((type) => 
      type.name.toLowerCase() === normalized
    );
  } catch {
    return undefined;
  }
};

export const getCountryByValue = (value: string): CountryEnumValue | undefined => {
  try {
    const { Country } = loadEnums();
    const normalized = value.toLowerCase().trim();
    return Country.values().find((country) => 
      country.isoCode2.toLowerCase() === normalized || 
      country.code.toLowerCase() === normalized ||
      country.name.toLowerCase() === normalized
    );
  } catch {
    return undefined;
  }
};

export const getCurrencyByValue = (value: string): CurrencyEnumValue | undefined => {
  try {
    const { Currency } = loadEnums();
    const normalized = value.toLowerCase().trim();
    return Currency.values().find((currency) => 
      currency.countryCode.toLowerCase() === normalized || 
      currency.isoCode3.toLowerCase() === normalized ||
      currency.isoNumericCode.toString() === value.trim()
    );
  } catch {
    return undefined;
  }
};

export const getOrderTypeByValue = (value: string): ValueEnum | undefined => {
  try {
    const { OrderType } = loadEnums();
    const normalized = value.toLowerCase().trim();
    return OrderType.values().find((orderType) => 
      orderType.value.toLowerCase() === normalized
    );
  } catch {
    return undefined;
  }
};

export const getOrderStatusByValue = (value: string): ValueEnum | undefined => {
  try {
    const { OrderStatus } = loadEnums();
    const normalized = value.toLowerCase().trim();
    return OrderStatus.values().find((orderStatus) => 
      orderStatus.value.toLowerCase() === normalized
    );
  } catch {
    return undefined;
  }
};

export const getOrderSourceByValue = (value: string): ValueEnum | undefined => {
  try {
    const { OrderSource } = loadEnums();
    const normalized = value.toLowerCase().trim();
    return OrderSource.values().find((orderSource) => 
      orderSource.value.toLowerCase() === normalized
    );
  } catch {
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
  toString: z.unknown().optional()
});

export const OrderTypeInstanceSchema = z.object({
  value: z.string(),
  displayName: z.string(),
  toString: z.unknown().optional()
});

export const OrderStatusInstanceSchema = z.object({
  value: z.string(),
  displayName: z.string(),
  description: z.string(),
  toString: z.unknown().optional()
});

export const OrderSourceInstanceSchema = z.object({
  value: z.string(),
  displayName: z.string(),
  description: z.string(),
  toString: z.unknown().optional()
});

// =============================================================================
// EXPORT ALL ENUM CLASSES (with error handling)
// =============================================================================

// Safe exports with fallbacks using IIFEs to keep bindings const
export const Metal = (() => {
  try {
    const enums = loadEnums();
    return enums.Metal;
  } catch {
    return undefined;
  }
})();

export const ProductType = (() => {
  try {
    const enums = loadEnums();
    return enums.ProductType;
  } catch {
    return undefined;
  }
})();

export const Country = (() => {
  try {
    const enums = loadEnums();
    return enums.Country;
  } catch {
    return undefined;
  }
})();

export const Currency = (() => {
  try {
    const enums = loadEnums();
    return enums.Currency;
  } catch {
    return undefined;
  }
})();

export const Producer = (() => {
  try {
    const enums = loadEnums();
    return enums.Producer;
  } catch {
    return undefined;
  }
})();

export const OrderType = (() => {
  try {
    const enums = loadEnums();
    return enums.OrderType;
  } catch {
    return undefined;
  }
})();

export const OrderStatus = (() => {
  try {
    const enums = loadEnums();
    return enums.OrderStatus;
  } catch {
    return undefined;
  }
})();

export const OrderSource = (() => {
  try {
    const enums = loadEnums();
    return enums.OrderSource;
  } catch {
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
