/**
 * Producer Types
 * 
 * Core producer interfaces and types
 */

// Producer Interface
export interface Producer {
  id: string;
  producerName: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
