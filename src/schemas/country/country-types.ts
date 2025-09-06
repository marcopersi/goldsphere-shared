/**
 * Country Types
 * 
 * Core country interfaces and types
 */

// Country Interface (unified for all country references)
export interface Country {
  id: string;
  countryName: string;
  isoCode2: string; // ISO 3166-1 alpha-2 (e.g., "US", "CA")
  createdAt: Date;
  updatedAt: Date;
}
