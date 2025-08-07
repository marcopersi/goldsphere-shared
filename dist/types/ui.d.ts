export type ToastVariant = "default" | "destructive" | "success" | "gold" | "silver" | "platinum";
export interface ProductDisplayType {
    id: string;
    name: string;
    description: string;
    image: string;
    isLocalImage?: boolean;
    price: number;
    currency: string;
    weight: number;
    weightUnit: string;
    fineness: number;
    producer: string;
    type: string;
    country: string;
    countryCode: string;
    metal: string;
}
export type ApiMode = 'mock' | 'development' | 'production';
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
//# sourceMappingURL=ui.d.ts.map