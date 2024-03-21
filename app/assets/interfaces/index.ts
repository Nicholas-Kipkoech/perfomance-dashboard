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
}
export interface IClaimsData {
  claimsCount: number;
  claimsStatus: string;
  branchCode: string;
}

export interface IBranches {
  organization_code: string;
  organization_name: string;
}
