# OpenAPI Environment Configuration

This document explains how to configure applications that consume the GoldSphere Products API specifications.

**Important**: The `@goldsphere/shared` package is a pure TypeScript library that contains OpenAPI YAML files as documentation artifacts. It does not include any HTTP server implementation. This guide is for applications that consume these specifications.

## Server Configuration

The OpenAPI specifications include flexible server variables that can be configured by consuming applications for different deployment environments:

### Default Configuration (Development)
```yaml
protocol: http
host: localhost
port: 8080
```

### Environment-Specific Configurations

#### Local Development
- **URL**: `http://localhost:8080/api`
- **Protocol**: http
- **Host**: localhost
- **Port**: 8080

#### Staging Environment
- **URL**: `https://staging-api.goldsphere.vault/api`
- **Protocol**: https
- **Host**: staging-api.goldsphere.vault
- **Port**: 443 (default for HTTPS)

#### Production Environment
- **URL**: `https://api.goldsphere.vault/api`
- **Protocol**: https
- **Host**: api.goldsphere.vault
- **Port**: 443 (default for HTTPS)

## Usage in Different Tools

### Consuming the OpenAPI Specifications

Applications can consume the OpenAPI YAML files from this package:

```typescript
import path from 'path';
import YAML from 'yamljs';

// Load the specification
const specPath = path.join(__dirname, 'node_modules/@goldsphere/shared/src/openapi/products-api.yaml');
const apiSpec = YAML.load(specPath);
```

### Swagger UI / OpenAPI Generators
When using tools like Swagger UI, Postman, or OpenAPI code generators with the specifications from this package:

1. **Select the appropriate server** from the dropdown in Swagger UI
2. **Override server variables** programmatically:
   ```javascript
   // Example for JavaScript/TypeScript clients
   const apiClient = new ProductsApi({
     basePath: process.env.API_BASE_URL || 'http://localhost:8080/api'
   });
   ```

### Environment Variables
Recommended environment variables for different deployment scenarios:

```bash
# Development
export API_PROTOCOL=http
export API_HOST=localhost
export API_PORT=8080

# Staging
export API_PROTOCOL=https
export API_HOST=staging-api.goldsphere.vault
export API_PORT=443

# Production
export API_PROTOCOL=https
export API_HOST=api.goldsphere.vault
export API_PORT=443
```

### Docker Configuration
For containerized deployments:

```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    image: goldsphere/products-api
    environment:
      - API_HOST=${API_HOST:-localhost}
      - API_PORT=${API_PORT:-8080}
      - API_PROTOCOL=${API_PROTOCOL:-http}
    ports:
      - "${API_PORT:-8080}:8080"
```

### CI/CD Pipeline Configuration
Example for GitHub Actions or similar:

```yaml
# .github/workflows/deploy.yml
env:
  DEV_API_URL: "http://localhost:8080/api"
  STAGING_API_URL: "https://staging-api.goldsphere.vault/api"
  PROD_API_URL: "https://api.goldsphere.vault/api"
```

## CDN Configuration for Images

The image URLs use a separate CDN domain (`cdn.goldsphere.vault`) to:
- Improve performance through geographical distribution
- Separate static content from API traffic
- Enable better caching strategies
- Reduce load on the main API servers

### Environment-specific CDN URLs:
- **Development**: `http://localhost:8080/static/images/`
- **Staging**: `https://staging-cdn.goldsphere.vault/images/`
- **Production**: `https://cdn.goldsphere.vault/images/`

## Best Practices

1. **Never hardcode URLs** in client applications
2. **Use environment variables** for configuration
3. **Validate server connectivity** before making API calls
4. **Implement proper error handling** for network issues
5. **Use HTTPS in all non-development environments**
6. **Configure proper CORS policies** for cross-origin requests

## Security Considerations

- **Development**: HTTP is acceptable for local development
- **Staging/Production**: Always use HTTPS with valid SSL certificates
- **API Keys**: Never include sensitive credentials in the OpenAPI spec
- **CORS**: Configure appropriate origins for each environment
