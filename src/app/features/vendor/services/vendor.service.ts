import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMarket } from '../models/vendor.model';
import { IService } from '../models/vendor.model';
import { IVendorCreation } from '../models/vendor.model';

@Injectable({
  providedIn: 'root',
})
export class VendorService {

  private baseUrl = 'http://localhost:5255/api';  

  constructor(private http: HttpClient) {}

  // Fetching markets from the backend
  getMarkets(): Observable<IMarket[]> {
    return this.http.get<IMarket[]>(`${this.baseUrl}/Market/GetMarkets`);
  }

  // Fetching services from the backend
  getServices(): Observable<IService[]> {
    return this.http.get<IService[]>(`${this.baseUrl}/Service/GetService`);
  }

  // Posting vendor data to the backend
  addVendor(vendorData: any): Observable<IVendorCreation> {
    return this.http.post<IVendorCreation>(`${this.baseUrl}/Vendor/CreateVendor`, vendorData);
  }
}
