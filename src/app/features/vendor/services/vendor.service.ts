import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVendorListing } from '../models/vendor.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private apiUrl = 'http://localhost:5255/api/Vendor/GetVendors';

  constructor(private http: HttpClient) {}

  getVendors(): Observable<IVendorListing[]> {
    return this.http.get<IVendorListing[]>(this.apiUrl);
  }

  getVendorById(id: string): Observable<IVendorListing> {
    return this.http.get<IVendorListing>(`${this.apiUrl}/${id}`);
  }

  createVendor(vendor: IVendorListing): Observable<IVendorListing> {
    return this.http.post<IVendorListing>(this.apiUrl, vendor);
  }

  updateVendor(id: string, vendor: IVendorListing): Observable<IVendorListing> {
    return this.http.put<IVendorListing>(`${this.apiUrl}/${id}`, vendor);
  }
}
