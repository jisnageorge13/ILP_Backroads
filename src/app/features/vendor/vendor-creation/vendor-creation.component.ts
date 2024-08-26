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

//method for doing proper validation of the form using formbuilder
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

//function for fetching markets form table
fetchMarkets(): void {
  this.vendorService.getMarkets().subscribe((data:IDropDownFields[]) => {
    this.markets = data;
  });
}

//function for fetching services form table
fetchServices(): void {
  this.vendorService.getServices().subscribe((data:IDropDownFields[]) => {
    this.services = data;
  });
}

 //function for submitting the entered vendor data
 submitVendor(): void {
  const formValue = this.addVendorForm.value;
  const vendorData: IVendorCreation = {
    name: formValue.vendorName,
    city: formValue.state,
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
