import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVendorCreation, IDropDownFields,IVendorListing} from '../models/vendor.model';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private baseUrl = 'http://localhost:5255/api';

  constructor(private http: HttpClient) {}

  getVendors(): Observable<IVendorListing[]> {
    return this.http.get<IVendorListing[]>(`${this.baseUrl}/Vendor/GetVendors`);
  }
  // Fetching markets from the backend
  getMarkets(): Observable<IDropDownFields[]> {
    return this.http.get<IDropDownFields[]>(
      `${this.baseUrl}/Market/GetMarkets`
    );
  }

  // Fetching services from the backend
  getServices(): Observable<IDropDownFields[]> {
    return this.http.get<IDropDownFields[]>(
      `${this.baseUrl}/Service/GetService`
    );
  }

  // Posting vendor data to the backend
  addVendor(vendorData: IVendorCreation): Observable<IVendorCreation> {
    return this.http.post<IVendorCreation>(
      `${this.baseUrl}/Vendor/CreateVendor`,
      vendorData
    );
  }
}
