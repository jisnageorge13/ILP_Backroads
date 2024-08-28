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
 * Method to fetch markets from backend using GET method
 */
  getMarkets(): Observable<IDropDownFields[]> {
    return this.http.get<IDropDownFields[]>(`${this.baseUrl}/Market/GetMarkets`);
  }

  /**
   * Method to fetch services from backend using GET method
   */
  getServices(): Observable<IDropDownFields[]> {
    return this.http.get<IDropDownFields[]>(`${this.baseUrl}/Service/GetService`);
  }

/**
 * Method to fetch vendors from backend using GET method
 */
  getVendors(): Observable<IVendor[]> {
    return this.http.get<IVendor[]>(`${this.baseUrl}/Vendor/GetVendors`);
  }

/**
 * Method to add  vendor  to backend using POST method
 */
  addVendor(vendorData: IVendorCreation): Observable<IVendorCreation> {
    return this.http.post<IVendorCreation>(`${this.baseUrl}/Vendor/CreateVendor`, vendorData);
  }

/**
 * Method to sending the updated vendor details to backend using PUT method
 */
  updateVendor(id: number, vendorData: IVendorCreation): Observable<IVendorCreation> {
    return this.http.post<IVendorCreation>(`${this.baseUrl}/Vendor/updateVendor/${id}`,vendorData
);
  }

/**
 * Method to fetch the particular vendor details from backend
 */
  getVendorById(id: number): Observable<IVendor> {
    return this.http.get<IVendor>(`${this.baseUrl}/Vendor/GetVendorData?id=${id}`);
  }

/**
 * Method to approve the vendor using PATCH method
 */
  approveVendor(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/Vendor/ApproveVendor/${id}`, {
      isApproved: true,
    });
  }
}
