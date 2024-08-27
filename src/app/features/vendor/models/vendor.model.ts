interface ICommonVendorFields {
  name: string;
  stateProvinceRegion?: string; 
  country: string;
  email: string;
  phone: string;
  website?: string; 
  isApproved: boolean;
}

export interface IVendorCreation extends ICommonVendorFields {
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
export interface IVendor extends ICommonVendorFields,IVendorData {
  id: number;
}
 
 