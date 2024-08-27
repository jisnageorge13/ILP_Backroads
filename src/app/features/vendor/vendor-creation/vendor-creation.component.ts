import { Component } from '@angular/core';
import { phonePattern } from '../config/vendor-config';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IVendorCreation,IDropDownFields} from '../models/vendor.model';
import { VendorService } from '../services/vendor.service';

/**  LLD
 * This component is to add new vendors
 * it has the fields:
 * Profile Info:
 * Vendor Name: Required text input.
 * State: Required input Dropdown with state options.
 * Country: Required input Dropdown with country options.
 * Markets: Required input Multi-select dropdown with  options.
 * Contact Info:
 * Email: Required email input.
 * Phone: Required Input with country code dropdown.
 * Website: Optional text input.
 * Service Category:
 * Service: Required input Dropdown with  options.
 * It has the buttons:
      *    Submit for approval
      *    Cancel
* This screen contains following actions:
      * Input values to different fields.
      * Submitting the data and going to View Profile page.
      * Cancelling the changes made and going back to Vendor Listing Page.
* Submit:
      * When the user clicks on the submit for approval button , user will be directed to view profile page.
* Cancel:
      * When the user clicks on cancel button, user will be directed back to Vendor Listing page. */

@Component({
  selector: 'app-vendor-creation',
  standalone: false,
  templateUrl: './vendor-creation.component.html',
  styleUrl: './vendor-creation.component.scss',
})

export class VendorCreationComponent {

addVendorForm!: FormGroup;
countries: string[] = ['USA', 'Germany', 'Australia', 'Brazil'];
states: string[] = ['California', 'Berlin', 'Sydney', 'Rio de Janeiro'];
markets!: IDropDownFields[];
services!: IDropDownFields[];

constructor(private readonly fb: FormBuilder, private vendorService: VendorService) {}

ngOnInit(){
 this.fetchMarkets();
 this.fetchServices();
 this.createAddVendorForm();
}

/**
  * Creates and validates the vendor creation form using FormBuilder.
  * 
  * This method sets up the form with fields like vendorName, state, country, markets, email,
  * phone, website, and service, along with appropriate validation rules.
  */
 createAddVendorForm(): void {
  this.addVendorForm = this.fb.group({
    vendorName: ['', [Validators.required, Validators.maxLength(100)]],
    state: [''],
    country: ['', Validators.required],
    markets: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]], 
    phone: [ '', [Validators.required, Validators.pattern(phonePattern)] ],
    website: [''],
    service: ['', Validators.required],
  });
}

/**
 * Fetches the list of markets from the backend.
 * 
 * This method retrieves the available markets and populates the `markets` array.
 */
fetchMarkets(): void {
  this.vendorService.getMarkets().subscribe((data:IDropDownFields[]) => {
    this.markets = data;
  });
}

 /**
 * Fetches the list of services from the backend.
 * 
 * This method retrieves the available services and populates the `services` array.
 */
fetchServices(): void {
  this.vendorService.getServices().subscribe((data:IDropDownFields[]) => {
    this.services = data;
  });
}

 /**
 * Submits the vendor data entered in the form.
 * 
 * This method collects the form data, maps it to the `IVendorCreation` interface, 
 * and sends it to the backend for submission.
 * 
 * @param {FormGroup} addVendorForm - The form group containing vendor details.
 */
 submitVendor(): void {
  const formValue = this.addVendorForm.value;
  const vendorData: IVendorCreation = {
    name: formValue.vendorName,
    stateProvinceRegion: formValue.state,
    country: formValue.country,
    email: formValue.email,
    phone: formValue.phone,
    website: formValue.website,
    serviceId: formValue.service,
    isApproved: false,
    marketIds: formValue.markets
  };
  this.vendorService.addVendor(vendorData).subscribe();
}
}
