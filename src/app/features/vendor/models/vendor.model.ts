export interface Vendor {
  id: string;
  name: string;
  state?:string;
  country:string;
  markets: string[];
  serviceCategories: string;
  email: string;
  phone: string;
  website?: string;
  isApproved: boolean;
}
