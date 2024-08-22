import { Component } from '@angular/core';
import { Vendor } from '../models/vendor.model';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  selector: 'app-creation',
  standalone: false,
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.scss',
  providers: [ConfirmationService,MessageService]
})

export class CreationComponent {
  
  // addVendorForm!: FormGroup;
  vendor: Vendor[] | undefined;
VendorName:string | undefined;
emailAddress:string | undefined;
selectedCode:string | undefined;
phoneNumber:string | undefined;
websiteName:string | undefined;
selectedCountry:string | undefined;
selectedMarket:string[] | undefined;
selectedService:string | undefined;
selectedState:string | undefined;
constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

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


}

confirm1(event: Event) {
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Successful', detail: 'Submitted successfully' });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
  });
}


confirm2(event: Event) {
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to cancel the changes made?',
      header: 'Cancel Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record cancelled' });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
  });
}

 submit(form: any) {
  const selectedState = form.value.state?.state || '';
  const selectedCountry = form.value.country?.country || '';
  const selectedService = form.value.service?.serviceCategories || '';
  const selectedMarkets = form.value.markets?.markets || [];
  const selectedCode=form.value.code?.code||'';

  const processedForm = {
    vendorName: form.value.vendorName,
    state: selectedState,
    country: selectedCountry,
    service: selectedService,
    markets: selectedMarkets,
    email: form.value.email,
    code:selectedCode,
    phone: form.value.phone,
    website: form.value.website,
  };

  console.log('Form Submitted!', processedForm);
}
}
