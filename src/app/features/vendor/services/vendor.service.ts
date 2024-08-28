import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IVendorCreation,
  IDropDownFields,
  IVendor,
} from '../models/vendor.model';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  
 private baseUrl = 'http://localhost:5255/api';

 constructor(private http: HttpClient) {}

/**
 * Method to fetch markets 
*/
  getMarkets(): Observable<IDropDownFields[]> {
    return this.http.get<IDropDownFields[]>(`${this.baseUrl}/Market/GetMarkets`);
  }

/**
 * Method to fetch services 
*/
  getServices(): Observable<IDropDownFields[]> {
    return this.http.get<IDropDownFields[]>(`${this.baseUrl}/Service/GetService`);
  }

/**
 * Method to fetch vendors 
 */
  getVendors(): Observable<IVendor[]> {
    return this.http.get<IVendor[]>(`${this.baseUrl}/Vendor/GetVendors`);
  }

/**
 * Method to add  vendor  
 */
  addVendor(vendorData: IVendorCreation): Observable<IVendorCreation> {
    return this.http.post<IVendorCreation>(`${this.baseUrl}/Vendor/CreateVendor`, vendorData);
  }

/**
 * Method to sending the updated vendor details 
 */
  updateVendor(id: number, vendorData: IVendorCreation): Observable<IVendorCreation> {
    return this.http.put<IVendorCreation>(`${this.baseUrl}/Vendor/EditVendor/${id}`,vendorData);
  }

/**
 * Method to fetch the particular vendor details 
 */
  getVendorById(id: number): Observable<IVendor> {
    return this.http.get<IVendor>(`${this.baseUrl}/Vendor/GetVendorData?id=${id}`);
  }

/**
 * Method to approve the vendor 
 */
  approveVendor(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/Vendor/ApproveVendor/${id}`, {
      isApproved: true,
    });
  }
}
