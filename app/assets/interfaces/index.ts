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
export interface IClaimsData {
  totalNumber: number;
  amountPaid: number;
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
