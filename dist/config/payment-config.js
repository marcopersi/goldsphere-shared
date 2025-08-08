"use strict";
// Payment Configuration Types
// File: goldsphere-shared/src/config/payment-config.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_VAR_MAPPINGS = exports.DEFAULT_PAYMENT_CONFIG = void 0;
/**
 * Default configuration values
 */
exports.DEFAULT_PAYMENT_CONFIG = {
    currency: {
        supportedCurrencies: ['EUR', 'USD'],
        defaultCurrency: 'EUR',
        currencySettings: {
            EUR: {
                minAmount: 100, // €1.00
                maxAmount: 10000000, // €100,000.00
                showSymbol: true,
                decimalPlaces: 2,
            },
            USD: {
                minAmount: 100, // $1.00
                maxAmount: 10000000, // $100,000.00
                showSymbol: true,
                decimalPlaces: 2,
            },
        },
    },
    fees: {
        processingFeePercentage: 2.9,
        fixedFee: 30,
        paymentMethodFees: {
            card: { percentage: 2.9, fixed: 30 },
            bankTransfer: { percentage: 0.8, fixed: 0 },
            sepaDebit: { percentage: 0.35, fixed: 0 },
        },
    },
    security: {
        require3DSecure: true,
        fraudDetection: {
            enabled: true,
            riskThreshold: 75,
        },
        rateLimiting: {
            enabled: true,
            maxRequestsPerMinute: 60,
            maxRequestsPerHour: 1000,
        },
    },
    compliance: {
        pciLevel: 'level-1',
        dataRetention: {
            paymentDataDays: 2555, // 7 years
            logDataDays: 365, // 1 year
            customerDataDays: 2555, // 7 years
        },
        gdpr: {
            enabled: true,
            autoDelete: false,
            dataExport: true,
        },
        regionalCompliance: {
            sca: true,
            openBanking: false,
        },
    },
    environment: {
        environment: 'development',
        apiBaseUrl: 'http://localhost:3000/api/v1',
        frontendBaseUrl: 'http://localhost:5173',
        debug: true,
        monitoring: false,
    },
    cache: {
        enabled: true,
        ttl: 300, // 5 minutes
        provider: 'memory',
        keyPrefix: 'goldsphere:payment:',
        maxSize: 1000,
    },
};
/**
 * Environment variable mappings
 */
exports.ENV_VAR_MAPPINGS = {
    // Stripe
    STRIPE_PUBLISHABLE_KEY: 'providers.stripe.publishableKey',
    STRIPE_SECRET_KEY: 'providers.stripe.secretKey',
    STRIPE_WEBHOOK_SECRET: 'providers.stripe.webhookSecret',
    // PayPal
    PAYPAL_CLIENT_ID: 'providers.paypal.clientId',
    PAYPAL_CLIENT_SECRET: 'providers.paypal.clientSecret',
    PAYPAL_ENVIRONMENT: 'providers.paypal.environment',
    // Environment
    PAYMENT_API_BASE_URL: 'environment.apiBaseUrl',
    PAYMENT_FRONTEND_BASE_URL: 'environment.frontendBaseUrl',
    PAYMENT_ENVIRONMENT: 'environment.environment',
    PAYMENT_DEBUG: 'environment.debug',
    // Webhooks
    PAYMENT_WEBHOOK_URL: 'webhooks.endpointUrl',
    PAYMENT_WEBHOOK_SECRET: 'webhooks.secret',
    // Security
    PAYMENT_REQUIRE_3DS: 'security.require3DSecure',
    PAYMENT_FRAUD_DETECTION: 'security.fraudDetection.enabled',
};
//# sourceMappingURL=payment-config.js.map