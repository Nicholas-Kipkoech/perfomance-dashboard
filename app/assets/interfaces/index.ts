export interface IBimaData {
  classCode: string;
  className: string;
  newPolicies: number;
  renewals: number;
  refund: number;
  additional: number;
  facin: number;
  commision: number;
  clientCode: string;
  clientsCount: number;
  motorCode: string;
  renewalCode: string;
}

export interface IRegisteredClaims {
  branchCode: string;
  totalProvision: number;
}

export interface IProduction {
  org_code: string;
  branchCode: string;
  branchName: string;
  newBusiness: number;
  renewals: number;
}

export interface IBranches {
  organization_code: string;
  organization_name: string;
}
export interface IClients {
  totalClients: number;
  clientCode: string;
}
export interface IUnrenewedPolicies {
  branchName: string;
  motorCount: number;
  nonMotorCount: number;
  motorAmount: number;
  nonMotorAmount: number;
}
export interface IUndebitedPolicies {
  branchCode: string;
  premiumCode: string;
  totalPremium: number;
}
export interface ISalvages {
  branchCode: string;
  receiptAmount: number;
}
export interface IRecovery {
  org_code: string;
  branchCode: string;
  mc_code: string;
  class: string;
  paidAmount: number;
  retentionAmount: number;
  treatyAmount: number;
  comesaAmount: number;
  facAmount: number;
  xolAmount: number;
}
export interface IReceipts {
  branchCode: string;
  currencyCode: string;
  receiptAmount: number;
}
