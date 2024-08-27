import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVendorCreation, IDropDownFields, IVendorData} from '../models/vendor.model';

@Injectable({
  providedIn: 'root',
})
export class VendorService {

  private baseUrl = 'http://localhost:5255/api';  

  constructor(private http: HttpClient) {}

  /**
   * method to fetch markets from backend using GET method
   */
  getMarkets(): Observable<IDropDownFields[]> {
    return this.http.get<IDropDownFields[]>(`${this.baseUrl}/Market/GetMarkets`);
  }

  /**
   * method to fetch services from backend using GET method
   */
  getServices(): Observable<IDropDownFields[]> {
    return this.http.get<IDropDownFields[]>(`${this.baseUrl}/Service/GetService`);
  }

  /**
   * method to add  vendor  to backend using POST method
   */
  addVendor(vendorData: IVendorCreation): Observable<IVendorCreation> {
    return this.http.post<IVendorCreation>(`${this.baseUrl}/Vendor/CreateVendor`, vendorData);
  }

  /**
   * method to sending the updated vendor details to backend using PUT method
   */
  updateVendor(vendorData: IVendorCreation): Observable<IVendorCreation> {
    return this.http.post<IVendorCreation>(`${this.baseUrl}/Vendor/CreateVendor`, vendorData);
  }

  /**
   * method to fetch the particular vendor details from backend
   */
  getVendorById(id: number): Observable<IVendorData> {
    return this.http.get<IVendorData>(`${this.baseUrl}/Vendor/GetVendorById/${id}`);
  }
}