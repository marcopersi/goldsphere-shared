# Export Manifest

This document lists all types, schemas, and contracts exported by the @goldsphere/shared package.

## Core Types

### Product Types (`./types/products`)
- `Product` - Core product entity
- `ProductRegistrationRequest` - Product creation request
- `ProductUpdateRequest` - Product update request
- `ProductsResponse` - Paginated products response
- `ProductQueryParams` - Product query parameters
- `BulkRegistrationRequest` - Bulk product registration
- `BulkRegistrationResponse` - Bulk registration response
- `ApiSuccess<T>` - Success response wrapper
- `ApiError` - Error response structure
- `ApiResponse<T>` - Union of success/error responses
- `Pagination` - Pagination metadata

### Portfolio Types (`./types/portfolio`)
- `Position` - Core position entity
- `PositionCreateRequest` - Position creation request
- `PositionUpdateRequest` - Position update request
- `PositionsResponse` - Paginated positions response
- `PositionQueryParams` - Position query parameters
- `Transaction` - Core transaction entity
- `TransactionCreateRequest` - Transaction creation request
- `TransactionHistoryItem` - Transaction with product details
- `TransactionsResponse` - Paginated transactions response
- `TransactionQueryParams` - Transaction query parameters
- `PortfolioSummary` - Portfolio overview with metrics
- `MetalBreakdown` - Metal-specific portfolio breakdown

## Validation Schemas (Zod)

### Product Schemas (`./validation/product-schemas`)
- `ProductSchema` - Product entity validation
- `ProductRegistrationRequestSchema` - Product creation validation
- `ProductUpdateRequestSchema` - Product update validation
- `ProductQueryParamsSchema` - Query parameters validation
- `ProductsResponseSchema` - Products response validation
- `BulkRegistrationRequestSchema` - Bulk registration validation
- `BulkRegistrationResponseSchema` - Bulk registration response validation
- `ApiErrorSchema` - Error response validation
- `ApiSuccessSchema` - Success response validation

### Portfolio Schemas (`./validation/portfolio-schemas`)
- `PositionSchema` - Position entity validation
- `PositionCreateRequestSchema` - Position creation validation
- `PositionUpdateRequestSchema` - Position update validation
- `PositionQueryParamsSchema` - Position query parameters validation
- `PositionsResponseSchema` - Positions response validation
- `TransactionSchema` - Transaction entity validation
- `TransactionCreateRequestSchema` - Transaction creation validation
- `TransactionHistoryItemSchema` - Transaction history validation
- `TransactionQueryParamsSchema` - Transaction query parameters validation
- `TransactionsResponseSchema` - Transactions response validation
- `PortfolioSummarySchema` - Portfolio summary validation
- `MetalBreakdownSchema` - Metal breakdown validation

## API Contracts

### Product API (`./contracts/product-api`)
- `ProductApiContract` - API endpoint contracts
- `ProductApiClient` - Client interface
- `ProductApiHandlers` - Server handler interface
- `ProductRepository` - Repository interface
- `ProductService` - Service interface
- `BaseApiClient` - Base client interface
- `TypedRequest<TBody, TParams, TQuery>` - Typed request interface
- `TypedResponse<TData>` - Typed response interface
- `UploadedFile` - File upload interface
- `API_ENDPOINTS` - Endpoint constants

### Portfolio API (`./contracts/portfolio-api`)
- `PortfolioApiContract` - API endpoint contracts
- `PortfolioApiClient` - Client interface
- `PortfolioApiHandlers` - Server handler interface
- `PositionRepository` - Position repository interface
- `TransactionRepository` - Transaction repository interface
- `PortfolioRepository` - Portfolio repository interface
- `PortfolioService` - Service interface
- `PORTFOLIO_API_ENDPOINTS` - Endpoint constants

## Utilities

- `z` - Re-exported Zod instance
- `GOLDSPHERE_SHARED_VERSION` - Package version constant

## Usage Examples

```typescript
// Import types
import { Product, Position, ApiResponse } from '@goldsphere/shared';

// Import validation schemas
import { ProductSchema, PositionSchema } from '@goldsphere/shared';

// Import API contracts
import { ProductApiHandlers, PortfolioApiHandlers } from '@goldsphere/shared';

// Import utilities
import { z, GOLDSPHERE_SHARED_VERSION } from '@goldsphere/shared';
```

## OpenAPI Specifications

The package also includes OpenAPI YAML files (not exported as TypeScript modules):
- `src/openapi/products-api.yaml` - Product management API
- `src/openapi/portfolio-api.yaml` - Portfolio management API
- `src/openapi/auth-api.yaml` - Authentication API
- `src/openapi/trading-api.yaml` - Trading API
