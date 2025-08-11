// UI Component Types
import { ApiMode } from './common';
import { Country, Currency, Metal } from '../enums';

export type ToastVariant = 
  | "default"
  | "destructive"
  | "success"
  | "gold"
  | "silver"
  | "platinum";

export interface ProductDisplayType {
  id: string;
  name: string;
  description: string;
  image: string;
  isLocalImage?: boolean;
  price: number;
  currency: Currency;
  weight: number;
  weightUnit: string;
  fineness: number;
  producer: string;
  type: string;
  country: Country;
  metal: Metal;
}

// Re-export ApiMode from common for backward compatibility
export { ApiMode } from './common';

export interface ApiConfig {
  mode: ApiMode;
  baseUrl: string;
  timeout: number;
  isMockMode: boolean;
}

export interface AuthToken {
  token: string;
  type: 'Bearer' | 'Basic';
  expiresAt?: string;
}

export interface FileUpload {
  file: File;
  name: string;
  type: string;
}
