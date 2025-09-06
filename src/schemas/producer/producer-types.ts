/**
 * Producer Types
 * 
 * Core producer interfaces and types
 */

// Producer Interface
export interface Producer {
  id: string;
  producerName: string;
  countryId: string; // Foreign key reference to country table
  websiteURL?: string; // Optional website URL
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
