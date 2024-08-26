export interface IVendor {
  id: string;
  name: string;
  state?: string;
  country: string;
  markets: string[];
  serviceCategories: string;
  email: string;
  phone: string;
  website?: string;
  isApproved: boolean;
}

export interface IVendorCreation {
  name: string;
  city: string;
  stateProvinceRegion: string;
  country: string;
  email: string;
  phone: string;
  website: string;
  serviceId: number;
  isApproved: boolean;
  marketIds: number[];
}

export interface IService {
  id: number;
  name: string;
}

export interface IMarket {
  id: number;
  name: string;
}