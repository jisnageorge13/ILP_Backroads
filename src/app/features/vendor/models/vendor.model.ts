interface ICommonVendorFields {
  name: string;
  stateProvinceRegion?: string; 
  country: string;
  email: string;
  phone: string;
  website?: string; 
  isApproved: boolean;
}

export interface IVendor extends ICommonVendorFields {
  id: string;
  state?: string;
  markets: string[];
  serviceCategories: string;
}

export interface IVendorCreation extends ICommonVendorFields {
  stateProvinceRegion: string;
  website: string;
  serviceId: number;
  marketIds: number[];
}

export interface IDropDownFields {
  id: number;
  name: string;
}

export interface IVendorData extends ICommonVendorFields {
  stateProvinceRegion: string;
  website: string;
  service: IDropDownFields;
  markets: IDropDownFields[];
}