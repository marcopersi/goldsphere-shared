/**
 * Custody API Contract
 * 
 * API endpoint definitions for custody services
 */

import { z } from 'zod';
import {
  CustodiansQuerySchema,
  CustodyServicesQuerySchema,
  CustodyAssignmentsQuerySchema,
  CreateCustodianRequestSchema,
  UpdateCustodianRequestSchema,
  CreateCustodyServiceRequestSchema,
  UpdateCustodyServiceRequestSchema,
  CreateCustodyAssignmentRequestSchema,
  UpdateCustodyAssignmentRequestSchema,
  CustodianResponseSchema,
  CustodiansResponseSchema,
  CustodyServiceResponseSchema,
  CustodyServicesResponseSchema,
  CustodyAssignmentResponseSchema,
  CustodyAssignmentsResponseSchema
} from '../validation/custody-api-schemas';

// Custodian endpoints
export const custodyApiContract = {
  custodians: {
    // GET /custodians
    list: {
      method: 'GET' as const,
      path: '/custodians',
      query: CustodiansQuerySchema,
      responses: {
        200: CustodiansResponseSchema
      }
    },
    
    // POST /custodians
    create: {
      method: 'POST' as const,
      path: '/custodians',
      body: CreateCustodianRequestSchema,
      responses: {
        201: CustodianResponseSchema
      }
    },
    
    // GET /custodians/:id
    get: {
      method: 'GET' as const,
      path: '/custodians/:id',
      pathParams: z.object({
        id: z.string().uuid()
      }),
      responses: {
        200: CustodianResponseSchema
      }
    },
    
    // PUT /custodians/:id
    update: {
      method: 'PUT' as const,
      path: '/custodians/:id',
      pathParams: z.object({
        id: z.string().uuid()
      }),
      body: UpdateCustodianRequestSchema,
      responses: {
        200: CustodianResponseSchema
      }
    },
    
    // DELETE /custodians/:id
    delete: {
      method: 'DELETE' as const,
      path: '/custodians/:id',
      pathParams: z.object({
        id: z.string().uuid()
      }),
      responses: {
        204: z.object({
          success: z.boolean()
        })
      }
    }
  },
  
  custodyServices: {
    // GET /custody-services
    list: {
      method: 'GET' as const,
      path: '/custody-services',
      query: CustodyServicesQuerySchema,
      responses: {
        200: CustodyServicesResponseSchema
      }
    },
    
    // POST /custody-services
    create: {
      method: 'POST' as const,
      path: '/custody-services',
      body: CreateCustodyServiceRequestSchema,
      responses: {
        201: CustodyServiceResponseSchema
      }
    },
    
    // GET /custody-services/:id
    get: {
      method: 'GET' as const,
      path: '/custody-services/:id',
      pathParams: z.object({
        id: z.string().uuid()
      }),
      responses: {
        200: CustodyServiceResponseSchema
      }
    },
    
    // PUT /custody-services/:id
    update: {
      method: 'PUT' as const,
      path: '/custody-services/:id',
      pathParams: z.object({
        id: z.string().uuid()
      }),
      body: UpdateCustodyServiceRequestSchema,
      responses: {
        200: CustodyServiceResponseSchema
      }
    },
    
    // DELETE /custody-services/:id
    delete: {
      method: 'DELETE' as const,
      path: '/custody-services/:id',
      pathParams: z.object({
        id: z.string().uuid()
      }),
      responses: {
        204: z.object({
          success: z.boolean()
        })
      }
    }
  },
  
  custodyAssignments: {
    // GET /custody-assignments
    list: {
      method: 'GET' as const,
      path: '/custody-assignments',
      query: CustodyAssignmentsQuerySchema,
      responses: {
        200: CustodyAssignmentsResponseSchema
      }
    },
    
    // POST /custody-assignments
    create: {
      method: 'POST' as const,
      path: '/custody-assignments',
      body: CreateCustodyAssignmentRequestSchema,
      responses: {
        201: CustodyAssignmentResponseSchema
      }
    },
    
    // GET /custody-assignments/:id
    get: {
      method: 'GET' as const,
      path: '/custody-assignments/:id',
      pathParams: z.object({
        id: z.string().uuid()
      }),
      responses: {
        200: CustodyAssignmentResponseSchema
      }
    },
    
    // PUT /custody-assignments/:id
    update: {
      method: 'PUT' as const,
      path: '/custody-assignments/:id',
      pathParams: z.object({
        id: z.string().uuid()
      }),
      body: UpdateCustodyAssignmentRequestSchema,
      responses: {
        200: CustodyAssignmentResponseSchema
      }
    },
    
    // DELETE /custody-assignments/:id
    delete: {
      method: 'DELETE' as const,
      path: '/custody-assignments/:id',
      pathParams: z.object({
        id: z.string().uuid()
      }),
      responses: {
        204: z.object({
          success: z.boolean()
        })
      }
    },
    
    // POST /custody-assignments/:id/transfer
    transfer: {
      method: 'POST' as const,
      path: '/custody-assignments/:id/transfer',
      pathParams: z.object({
        id: z.string().uuid()
      }),
      body: z.object({
        newCustodyServiceId: z.string().uuid(),
        transferNotes: z.string().optional(),
        effectiveDate: z.string().datetime().optional()
      }),
      responses: {
        200: CustodyAssignmentResponseSchema
      }
    }
  }
} as const;
