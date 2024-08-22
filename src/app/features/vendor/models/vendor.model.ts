export interface IVendor {
  id: string;
  name: string;
  state?: string;
  country: string;
  markets: string[];
  serviceCategories: string;
  email: string;
  code: string;
  phone: string;
  website?: string;
  isApproved: boolean;
}
