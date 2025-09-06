/**
 * Producer Types
 * 
 * Core producer interfaces and types
 */

// Producer Interface
export interface Producer {
  id: string;
  producerName: string;
  createdAt: Date;
  updatedAt: Date;
}
