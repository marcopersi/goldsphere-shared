import { 
  Metal, 
  ProductType, 
  Country, 
  Currency, 
  Producer, 
  Custodian, 
  PaymentFrequency, 
  CustodyServiceType 
} from '../enums';

// Reference Data Response Interface
export interface ReferenceDataResponse {
  success: boolean;
  data: {
    metals: Metal[];
    productTypes: ProductType[];
    countries: Country[];
    producers: Producer[];
    currencies: Currency[];
    custodians: Custodian[];
    paymentFrequencies: PaymentFrequency[];
    custodyServiceTypes: CustodyServiceType[];
  };
}

// Individual reference data response interfaces
export interface MetalsResponse {
  success: boolean;
  data: Metal[];
}

export interface ProductTypesResponse {
  success: boolean;
  data: ProductType[];
}

export interface CountriesResponse {
  success: boolean;
  data: Country[];
}

export interface CurrenciesResponse {
  success: boolean;
  data: Currency[];
}

export interface ProducersResponse {
  success: boolean;
  data: Producer[];
}

export interface CustodiansResponse {
  success: boolean;
  data: Custodian[];
}

export interface PaymentFrequenciesResponse {
  success: boolean;
  data: PaymentFrequency[];
}

export interface CustodyServiceTypesResponse {
  success: boolean;
  data: CustodyServiceType[];
}
