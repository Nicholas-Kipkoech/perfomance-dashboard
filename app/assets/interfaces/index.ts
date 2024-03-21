export interface IBimaData {
  totalPremium: number;
  branchCode: string;
  intermediaryCode: string;
  noOfClients: number;
  motorCode: string;
  year: number;
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
