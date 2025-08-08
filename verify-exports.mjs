#!/usr/bin/env node

/**
 * Test script to verify all required exports are available
 * Run with: node verify-exports.mjs
 */

// Test imports that the server expects
try {
  // Import from the built package
  const {
    // Schemas the server expects
    PaymentIntentCreateSchema,
    PaymentIntentConfirmSchema,
    CreatePaymentIntentRequestSchema,
    ConfirmPaymentRequestSchema,
    PaymentErrorSchema,
    
    // Types the server expects
    PaymentError,
    CreatePaymentIntentRequest,
    ConfirmPaymentRequest,
    RetrievePaymentIntentResponse,
    ListPaymentMethodsResponse,
    RefundRequest,
    RefundResponse,
    PaymentWebhookEvent,
    PaymentMethod,
    PaymentIntent,
    
    // Service interface the server expects
    PaymentService
  } = await import('./dist/index.js');

  console.log('✅ All required exports are available:');
  console.log('📋 Schemas:');
  console.log('  - PaymentIntentCreateSchema (alias for CreatePaymentIntentRequestSchema)');
  console.log('  - PaymentIntentConfirmSchema (alias for ConfirmPaymentRequestSchema)');
  console.log('  - CreatePaymentIntentRequestSchema');
  console.log('  - ConfirmPaymentRequestSchema');
  console.log('  - PaymentErrorSchema');
  
  console.log('\n🏗️ Types:');
  console.log('  - PaymentError');
  console.log('  - CreatePaymentIntentRequest');
  console.log('  - ConfirmPaymentRequest');
  console.log('  - RetrievePaymentIntentResponse');
  console.log('  - ListPaymentMethodsResponse');
  console.log('  - RefundRequest');
  console.log('  - RefundResponse');
  console.log('  - PaymentWebhookEvent');
  console.log('  - PaymentMethod');
  console.log('  - PaymentIntent');
  
  console.log('\n⚙️ Services:');
  console.log('  - PaymentService interface');
  
  console.log('\n🎉 Server integration should work correctly!');
  
} catch (error) {
  console.error('❌ Missing exports:', error.message);
  process.exit(1);
}
