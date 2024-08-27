export interface IVendorListing {
  id: string;
  name: string;
  markets: string[];
  serviceCategories: string;
  website?: string;
  isApproved: boolean;
}

export interface IVendorCreation {
  name: string;
  stateProvinceRegion: string;
  country: string;
  email: string;
  phone: string;
  website: string;
  serviceId: number;
  isApproved: boolean;
  marketIds: number[];
}

export interface IDropDownFields {
  id: number;
  name: string;
}

