import { Component } from '@angular/core';
import { IVendor } from '../models/vendor.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// LLD

// This component is to add new vendors

// it has the fields:

// Profile Info:
// Vendor Name: Required text input.
// State: Required input Dropdown with state options.
// Country: Required input Dropdown with country options.
// Markets: Required input Multi-select dropdown with  options.
// Contact Info:
// Email: Required email input.
// Phone: Required Input with country code dropdown.
// Website: Optional text input.
// Service Category:
// Service: Required input Dropdown with  options.

// It has the buttons:
// Submit for approval
// Cancel

// This screen contains following actions:
// Input values to different fields.
// Submitting the data and going to View Profile page.
// Cancelling the changes made and going back to Vendor Listing Page.

// Submit:
// When the user clicks on the submit for approval button a modal wil appear asking the confirmation  for data submission,
// if user confirms, user will be directed to view profile page.

// Cancel:
// When the user clicks on cancel button a modal will appear asking confirmation for cancelling the data entered without submitting,
// if user confirms , user will be directed back to Vendor Listing page.

@Component({
  selector: 'app-vendor-creation',
  standalone: false,
  templateUrl: './vendor-creation.component.html',
  styleUrl: './vendor-creation.component.scss',
})

export class VendorCreationComponent {

addVendorForm!: FormGroup;
vendor!: IVendor[] ;

ngOnInit(){
  this.vendor = [
    {
      id: '1',
      name: 'Vendor A',
      state: 'California',
      country: 'USA',
      code:'+1',
      markets: ['USA', 'Canada'],
      serviceCategories: 'IT Services',
      email: 'vendorA@example.com',
      phone: '123-456-7890',
      website: 'https://vendorA.com',
      isApproved: true,
    },
    {
      id: '2',
      name: 'Vendor B',
      state: 'Berlin',
      country: 'Germany',
      code:'+49',
      markets: ['Europe'],
      serviceCategories: 'Manufacturing',
      email: 'vendorB@example.com',
      phone: '234-567-8901',
      isApproved: false,
    },
    {
      id: '3',
      name: 'Vendor C',
      country: 'Australia',
      code:'+61',
      markets: ['Asia', 'Australia'],
      serviceCategories: 'Healthcare',
      email: 'vendorC@example.com',
      phone: '345-678-9012',
      website: 'https://vendorC.com',
      isApproved: true,
    },
    {
      id: '4',
      name: 'Vendor D',
      country: 'Brazil',
      code:'+55',
      markets: ['South America'],
      serviceCategories: 'Construction',
      email: 'vendorD@example.com',
      phone: '456-789-0123',
      isApproved: false,
    },
];

this.addVendorForm=new FormGroup({
  vendorName:new FormControl('',[Validators.required]),
  state: new FormControl(''),
  code: new FormControl(''),
  country: new FormControl('',[Validators.required]),
  markets:new FormControl('',[Validators.required]),
  email:new FormControl('',[Validators.required]),
  phone:new FormControl('',[Validators.required]),
  website:new FormControl(''),
  service:new FormControl('',[Validators.required])
});
}

 //function for submitting the entered vendor data
 submitVendor() {
  const selectedState = this.addVendorForm.value.state?.state || '';
  const selectedCountry = this.addVendorForm.value.country?.country || '';
  const selectedService = this.addVendorForm.value.service?.serviceCategories || '';
  const selectedCode=this.addVendorForm.value.code?.code||'';
  const processedForm = {
    vendorName: this.addVendorForm.value.vendorName,
    state: selectedState,
    country: selectedCountry,
    service: selectedService,
    markets: this.addVendorForm.value,
    email: this.addVendorForm.value.email,
    code:selectedCode,
    phone: this.addVendorForm.value.phone,
    website: this.addVendorForm.value.website,
  };
}
}
