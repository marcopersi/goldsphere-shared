/**
 * Stripe provider configuration
 */
export interface StripeConfig {
    /** Stripe publishable key */
    publishableKey: string;
    /** Stripe secret key (server-side only) */
    secretKey?: string;
    /** Webhook endpoint secret */
    webhookSecret?: string;
    /** Stripe API version */
    apiVersion?: string;
    /** Whether to use test mode */
    testMode?: boolean;
    /** Stripe account ID (for Connect) */
    accountId?: string;
}
/**
 * PayPal provider configuration
 */
export interface PayPalConfig {
    /** PayPal client ID */
    clientId: string;
    /** PayPal client secret (server-side only) */
    clientSecret?: string;
    /** PayPal environment */
    environment: 'sandbox' | 'production';
    /** Webhook ID for event verification */
    webhookId?: string;
}
/**
 * Bank transfer configuration
 */
export interface BankTransferConfig {
    /** Supported bank networks */
    supportedNetworks: Array<'sepa' | 'ach' | 'wire'>;
    /** Default processing time in business days */
    defaultProcessingDays: number;
    /** Maximum transfer amount */
    maxAmount?: number;
    /** Minimum transfer amount */
    minAmount?: number;
    /** Required verification levels */
    verificationRequirements: {
        kyc: boolean;
        bankAccountVerification: boolean;
    };
}
/**
 * Currency and regional settings
 */
export interface CurrencyConfig {
    /** Supported currencies */
    supportedCurrencies: Array<'EUR' | 'USD' | 'GBP' | 'CHF'>;
    /** Default currency */
    defaultCurrency: 'EUR' | 'USD' | 'GBP' | 'CHF';
    /** Currency-specific settings */
    currencySettings: Record<string, {
        /** Minimum payment amount in cents */
        minAmount: number;
        /** Maximum payment amount in cents */
        maxAmount: number;
        /** Whether to show currency symbol */
        showSymbol: boolean;
        /** Number of decimal places */
        decimalPlaces: number;
    }>;
}
/**
 * Fee configuration
 */
export interface FeeConfig {
    /** Processing fee percentage (0-100) */
    processingFeePercentage: number;
    /** Fixed processing fee in cents */
    fixedFee: number;
    /** Currency conversion fee percentage */
    currencyConversionFee?: number;
    /** Payment method specific fees */
    paymentMethodFees: {
        card: {
            percentage: number;
            fixed: number;
        };
        bankTransfer: {
            percentage: number;
            fixed: number;
        };
        sepaDebit: {
            percentage: number;
            fixed: number;
        };
    };
}
/**
 * Security configuration
 */
export interface SecurityConfig {
    /** Whether to require 3D Secure for card payments */
    require3DSecure: boolean;
    /** Fraud detection settings */
    fraudDetection: {
        enabled: boolean;
        riskThreshold: number;
        blockedCountries?: string[];
        allowedCountries?: string[];
    };
    /** Rate limiting settings */
    rateLimiting: {
        enabled: boolean;
        maxRequestsPerMinute: number;
        maxRequestsPerHour: number;
    };
    /** IP whitelist for webhook endpoints */
    webhookIpWhitelist?: string[];
}
/**
 * Compliance configuration
 */
export interface ComplianceConfig {
    /** PCI DSS compliance level */
    pciLevel: 'level-1' | 'level-2' | 'level-3' | 'level-4';
    /** Data retention settings */
    dataRetention: {
        /** Payment data retention in days */
        paymentDataDays: number;
        /** Log data retention in days */
        logDataDays: number;
        /** Customer data retention in days */
        customerDataDays: number;
    };
    /** GDPR settings */
    gdpr: {
        enabled: boolean;
        /** Auto-delete after retention period */
        autoDelete: boolean;
        /** Data export capabilities */
        dataExport: boolean;
    };
    /** Regional compliance requirements */
    regionalCompliance: {
        /** Strong Customer Authentication for EU */
        sca: boolean;
        /** Open Banking compliance */
        openBanking: boolean;
    };
}
/**
 * Webhook configuration
 */
export interface WebhookConfig {
    /** Webhook endpoint URL */
    endpointUrl: string;
    /** Events to subscribe to */
    enabledEvents: Array<'payment_intent.succeeded' | 'payment_intent.payment_failed' | 'payment_intent.canceled' | 'payment_method.attached' | 'invoice.payment_succeeded' | 'customer.created' | 'customer.updated'>;
    /** Webhook secret for signature verification */
    secret: string;
    /** Retry configuration */
    retryConfig: {
        maxAttempts: number;
        backoffMultiplier: number;
        maxDelay: number;
    };
    /** Timeout for webhook delivery */
    timeout: number;
}
/**
 * Environment-specific configuration
 */
export interface EnvironmentConfig {
    /** Current environment */
    environment: 'development' | 'staging' | 'production';
    /** API base URL */
    apiBaseUrl: string;
    /** Frontend base URL */
    frontendBaseUrl: string;
    /** Whether to enable debug logging */
    debug: boolean;
    /** Whether to enable performance monitoring */
    monitoring: boolean;
}
/**
 * Cache configuration
 */
export interface CacheConfig {
    /** Whether caching is enabled */
    enabled: boolean;
    /** Cache TTL in seconds */
    ttl: number;
    /** Cache provider */
    provider: 'memory' | 'redis' | 'memcached';
    /** Cache key prefix */
    keyPrefix: string;
    /** Maximum cache size */
    maxSize?: number;
}
/**
 * Notification configuration
 */
export interface NotificationConfig {
    /** Email notifications */
    email: {
        enabled: boolean;
        /** Email templates */
        templates: {
            paymentSucceeded: string;
            paymentFailed: string;
            refundProcessed: string;
        };
        /** From email address */
        fromAddress: string;
    };
    /** SMS notifications */
    sms: {
        enabled: boolean;
        provider: 'twilio' | 'aws-sns';
        /** SMS templates */
        templates: {
            paymentSucceeded: string;
            paymentFailed: string;
        };
    };
    /** Push notifications */
    push: {
        enabled: boolean;
        provider: 'firebase' | 'apns';
    };
}
/**
 * Main payment configuration interface
 */
export interface PaymentConfig {
    /** Payment providers configuration */
    providers: {
        stripe?: StripeConfig;
        paypal?: PayPalConfig;
        bankTransfer?: BankTransferConfig;
    };
    /** Currency and regional settings */
    currency: CurrencyConfig;
    /** Fee configuration */
    fees: FeeConfig;
    /** Security settings */
    security: SecurityConfig;
    /** Compliance settings */
    compliance: ComplianceConfig;
    /** Webhook configuration */
    webhooks: WebhookConfig;
    /** Environment configuration */
    environment: EnvironmentConfig;
    /** Cache configuration */
    cache?: CacheConfig;
    /** Notification configuration */
    notifications?: NotificationConfig;
}
/**
 * Configuration validation interface
 */
export interface ConfigValidator {
    /**
     * Validate the payment configuration
     */
    validate(config: PaymentConfig): ConfigValidationResult;
}
export interface ConfigValidationResult {
    valid: boolean;
    errors: Array<{
        path: string;
        message: string;
        severity: 'error' | 'warning';
    }>;
}
/**
 * Configuration loader interface
 */
export interface ConfigLoader {
    /**
     * Load configuration from environment variables
     */
    loadFromEnv(): PaymentConfig;
    /**
     * Load configuration from file
     */
    loadFromFile(filePath: string): PaymentConfig;
    /**
     * Load configuration from object
     */
    loadFromObject(config: Partial<PaymentConfig>): PaymentConfig;
}
/**
 * Default configuration values
 */
export declare const DEFAULT_PAYMENT_CONFIG: Partial<PaymentConfig>;
/**
 * Environment variable mappings
 */
export declare const ENV_VAR_MAPPINGS: {
    readonly STRIPE_PUBLISHABLE_KEY: "providers.stripe.publishableKey";
    readonly STRIPE_SECRET_KEY: "providers.stripe.secretKey";
    readonly STRIPE_WEBHOOK_SECRET: "providers.stripe.webhookSecret";
    readonly PAYPAL_CLIENT_ID: "providers.paypal.clientId";
    readonly PAYPAL_CLIENT_SECRET: "providers.paypal.clientSecret";
    readonly PAYPAL_ENVIRONMENT: "providers.paypal.environment";
    readonly PAYMENT_API_BASE_URL: "environment.apiBaseUrl";
    readonly PAYMENT_FRONTEND_BASE_URL: "environment.frontendBaseUrl";
    readonly PAYMENT_ENVIRONMENT: "environment.environment";
    readonly PAYMENT_DEBUG: "environment.debug";
    readonly PAYMENT_WEBHOOK_URL: "webhooks.endpointUrl";
    readonly PAYMENT_WEBHOOK_SECRET: "webhooks.secret";
    readonly PAYMENT_REQUIRE_3DS: "security.require3DSecure";
    readonly PAYMENT_FRAUD_DETECTION: "security.fraudDetection.enabled";
};
//# sourceMappingURL=payment-config.d.ts.map