interface ICommonVendorFields {
  name: string;
  stateProvinceRegion?: string; 
  country: string;
  email: string;
  phone: string;
  website?: string; 
}

export interface IVendorCreation extends ICommonVendorFields {
  id?: number
  serviceId: number;
  marketIds: number[];
}
 
export interface IDropDownFields {
  id: number;
  name: string;
}
 
export interface IVendorData extends ICommonVendorFields {
  service: IDropDownFields;
  markets: IDropDownFields[];
}

export interface IVendor extends IVendorData {
  id: number;
  isApproved: boolean;
}