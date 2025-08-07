# @goldsphere/shared

[![CI](https://github.com/marcopersi/goldsphere-shared/actions/workflows/ci.yml/badge.svg)](https://github.com/marcopersi/goldsphere-shared/actions/workflows/ci.yml)
[![Security](https://github.com/marcopersi/goldsphere-shared/actions/workflows/security.yml/badge.svg)](https://github.com/marcopersi/goldsphere-shared/actions/workflows/security.yml)
[![npm version](https://badge.fury.io/js/%40goldsphere%2Fshared.svg)](https://badge.fury.io/js/%40goldsphere%2Fshared)

Shared types, schemas, and API contracts for the GoldSphere precious metals platform.

## Overview

This package provides TypeScript types, Zod validation schemas, and OpenAPI specifications that are shared across different components of the GoldSphere ecosystem (frontend, backend, mobile apps, etc.).

**This is a pure TypeScript library** - it contains no runtime server code, HTTP handlers, or framework dependencies. It only provides type definitions, validation schemas, and API contract specifications.

## Features

- 🔷 **TypeScript Types**: Strongly typed interfaces for all API entities
- 🛡️ **Zod Validation**: Runtime validation schemas with TypeScript inference
- 📋 **OpenAPI Specs**: Complete API documentation and contract definitions (as YAML files)
- 🧩 **Framework Agnostic**: Can be used with any Node.js framework (Express, Fastify, etc.)
- 🌍 **Environment Flexible**: Configurable for development, staging, and production

## Installation

```bash
npm install @goldsphere/shared
```

## Project Structure

```
src/
├── contracts/          # API contract definitions (request/response handlers)
│   ├── product-api.ts  # Product management API contracts
│   ├── portfolio-api.ts # Portfolio management API contracts
│   └── auth-api.ts     # Authentication API contracts
├── openapi/            # OpenAPI 3.0 specifications
│   ├── products-api.yaml
│   ├── portfolio-api.yaml
│   ├── auth-api.yaml
│   └── trading-api.yaml
├── types/              # TypeScript type definitions
│   ├── products.ts     # Product-related types
│   ├── portfolio.ts    # Portfolio-related types
│   ├── auth.ts         # Authentication types
│   └── common.ts       # Common/shared types
└── validation/         # Zod validation schemas
    ├── product-schemas.ts    # Product validation schemas
    ├── portfolio-schemas.ts  # Portfolio validation schemas
    └── auth-schemas.ts       # Auth validation schemas
```

## Usage

### TypeScript Types

```typescript
import { Product, ProductRegistrationRequest } from '@goldsphere/shared/types/products';
import { Position, PortfolioSummary, TransactionCreateRequest } from '@goldsphere/shared/types/portfolio';

const product: Product = {
  id: 'prod_123',
  name: '1 oz Gold Coin',
  // ... other properties
};

const position: Position = {
  id: 'pos_123',
  userId: 'user_456',
  productId: 'prod_123',
  purchaseDate: '2024-08-07T10:00:00Z',
  purchasePrice: 2100.50,
  marketPrice: 2150.00,
  quantity: 1,
  issuingCountry: 'USA',
  producer: 'US Mint',
  certifiedProvenance: true,
  status: 'active',
  createdAt: '2024-08-07T10:00:00Z',
  updatedAt: '2024-08-07T10:00:00Z'
};
```

### Validation Schemas

```typescript
import { ProductSchema, ProductRegistrationRequestSchema } from '@goldsphere/shared/validation/product-schemas';
import { PositionSchema, TransactionCreateRequestSchema, PortfolioSummarySchema } from '@goldsphere/shared/validation/portfolio-schemas';

// Validate product data
const result = ProductSchema.safeParse(productData);
if (result.success) {
  console.log('Valid product:', result.data);
} else {
  console.error('Validation errors:', result.error.issues);
}

// Validate portfolio position
const positionResult = PositionSchema.safeParse(positionData);
if (positionResult.success) {
  console.log('Valid position:', positionResult.data);
}
```

### API Contracts

```typescript
import { ProductApiHandlers, TypedRequest, TypedResponse, UploadedFile } from '@goldsphere/shared/contracts/product-api';
import { PortfolioApiHandlers } from '@goldsphere/shared/contracts/portfolio-api';

// Implement Product API handlers with proper typing (using any framework)
const productHandlers: ProductApiHandlers = {
  getProducts: async (req: TypedRequest<never, never, ProductQueryParams>, res: TypedResponse<ProductsResponse>) => {
    // Implementation with full type safety
    // Framework-agnostic - can be used with Express, Fastify, etc.
  }
};

// Implement Portfolio API handlers
const portfolioHandlers: PortfolioApiHandlers = {
  getPositions: async (req, res) => {
    // Get user's portfolio positions
  },
  createPosition: async (req, res) => {
    // Create a new position
  },
  getPortfolioSummary: async (req, res) => {
    // Get portfolio summary with metal breakdown
  }
  // ... other handlers
};
```

### OpenAPI Specifications

The package includes YAML files that can be used with any OpenAPI tooling:

```typescript
// The OpenAPI specs are available as static files
import path from 'path';

const openApiSpecPath = path.join(__dirname, 'node_modules/@goldsphere/shared/src/openapi/products-api.yaml');
// Use with swagger-ui-express, fastify-swagger, etc.
```

## Environment Configuration

The OpenAPI specifications support flexible server configuration for different environments. These are documentation artifacts that can be consumed by API servers and clients:

- **Development**: `http://localhost:8080/api`
- **Staging**: `https://staging-api.goldsphere.vault/api`
- **Production**: `https://api.goldsphere.vault/api`

See [OpenAPI Configuration Guide](./src/openapi/README.md) for detailed environment setup instructions.

**Note**: This package does not include any HTTP server implementation. The OpenAPI YAML files are provided as specifications that can be consumed by server frameworks (Express, Fastify, etc.) or client generators.

## Development

### Prerequisites

- Node.js 18+
- npm 8+

### Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check
```

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run build:watch` - Watch mode compilation
- `npm run clean` - Remove build artifacts
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix auto-fixable linting issues
- `npm run type-check` - Run TypeScript type checking
- `npm run ci` - Run all CI checks locally (lint + type-check + build)
- `npm run prepack` - Automatically runs before packaging (calls `ci` script)

## API Documentation

The OpenAPI specifications are located in `src/openapi/`:

- `products-api.yaml` - Products catalog management API
- `auth-api.yaml` - Authentication and authorization API  
- `trading-api.yaml` - Trading and transactions API
- `portfolio-api.yaml` - Portfolio management API (positions, transactions, summaries)

These are static YAML files that can be consumed by:
- **Server frameworks**: Express + swagger-ui-express, Fastify + fastify-swagger, etc.
- **Client generators**: OpenAPI Generator, Swagger Codegen, etc.
- **Documentation tools**: Swagger UI, Redoc, etc.
- **API testing tools**: Postman, Insomnia, etc.

Example of using with Express:
```typescript
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const specPath = path.join(__dirname, 'node_modules/@goldsphere/shared/src/openapi/products-api.yaml');
const swaggerDocument = YAML.load(specPath);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

## Contributing

1. Follow the existing code style
2. Run `npm run lint` before committing
3. Ensure all types are properly documented
4. Update OpenAPI specs when changing API contracts

## License

MIT License - see LICENSE file for details.
