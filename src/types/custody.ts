/**
 * Custody Types (facade)
 *
 * Source of truth lives in validation/custody-schemas (Zod). This file re-exports
 * those inferred types so you can find custody-related shapes under src/types too,
 * without duplicating definitions.
 */

// Re-export ONLY types to avoid runtime duplication
export type {
  CustodianType as Custodian,
  CustodyService,
  ExtendedCustodianType as ExtendedCustodian,
  ExtendedCustodyServiceType as ExtendedCustodyService,
  CustodyAssignmentType as CustodyAssignment,
  PositionCustodyInfoType as PositionCustodyInfo,
  CreateCustodianRequestType as CreateCustodianRequest,
  UpdateCustodianRequestType as UpdateCustodianRequest,
  CreateCustodyServiceRequestType as CreateCustodyServiceRequest,
  UpdateCustodyServiceRequestType as UpdateCustodyServiceRequest,
  CustodiansResponseType as CustodiansResponse,
  CustodyServicesResponseType as CustodyServicesResponse,
  CustodyErrorResponseType as CustodyErrorResponse,
} from '../validation/custody-schemas';
