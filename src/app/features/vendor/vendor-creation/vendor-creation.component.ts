import { Component } from '@angular/core';
import { IVendor } from '../models/vendor.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

constructor(private readonly fb: FormBuilder) {}

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

this.createAddVendorForm();
}

//method for doing proper validation of the form using formbuilder
 createAddVendorForm(): void {
  this.addVendorForm = this.fb.group({
    vendorName: ['', Validators.required],
    state: [''],
    country: ['', Validators.required],
    markets: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]], 
    phone: [ '', [Validators.required,Validators.pattern(/^[1-9][0-9]{9}$/)] ],
    website: [''],
    service: ['', Validators.required],
  });
}

 //function for submitting the entered vendor data
 submitVendor():void {
  const vendorData = this.addVendorForm.value;
}
}
