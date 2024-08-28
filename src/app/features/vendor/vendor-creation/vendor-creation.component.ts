import { Component, OnInit } from '@angular/core';
import { phonePattern } from '../config/vendor-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IVendorCreation,
  IDropDownFields,
  IVendorData,
} from '../models/vendor.model';
import { VendorService } from '../services/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

/**  LLD
 * This component is to add new vendors and update existing vendors.
 * It has the fields:
 *
 * Profile Info:
 * Vendor Name: Required text input.
 * State: Required input dropdown with state options.
 * Country: Required input dropdown with country options.
 * Markets: Required input multi-select dropdown with options.
 *
 * Contact Info:
 * Email: Required email input.
 * Phone: Required input with country code dropdown.
 * Website: Optional text input.
 *
 * Service Category:
 * Service: Required input dropdown with options.
 *
 * It has the buttons:
 *    - Submit for approval
 *    - Update (appears when editing an existing vendor)
 *    - Cancel
 *
 * This screen contains the following actions:
 *    - Input values to different fields.
 *    - Submitting the data and going to the View Profile page.
 *    - Updating existing vendor information and going to the View Profile page.
 *    - Cancelling the changes made and going back to the Vendor Listing page.
 *
 * Submit:
 *    - When the user clicks on the "Submit for approval" button, user will be directed to the View Profile page after saving the new vendor data.
 *
 * Update:
 *    - When the user clicks on the "Update" button (only visible when editing an existing vendor), user will be directed to the View Profile page after saving the updated vendor data.
 *
 * Cancel:
 *    - When the user clicks on the "Cancel" button, user will be directed back to the Vendor Listing page without saving any changes.
 */

@Component({
  selector: 'app-vendor-creation',
  templateUrl: './vendor-creation.component.html',
  styleUrl: './vendor-creation.component.scss',
})
export class VendorCreationComponent implements OnInit {
  addVendorForm!: FormGroup;
  isEdit = false;
  vendorData?: IVendorData;
  countries: string[] = ['USA', 'Germany', 'Australia', 'Brazil', 'India'];
  states: string[] = ['California','Berlin','Sydney','Rio de Janeiro','Kerala',];
  markets!: IDropDownFields[];
  services!: IDropDownFields[];
  selectedVendorId!: number;
  vendorName='';
  
  constructor(
    private readonly fb: FormBuilder,
    private vendorService: VendorService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService :MessageService,
  ) {}

  ngOnInit() {
    this.isEdit = this.router.url.includes('edit');
    this.fetchMarkets();
    this.fetchServices();
    this.createAddVendorForm();
    if (this.isEdit) {
      this.selectedVendorId = Number(this.route.snapshot.paramMap.get('id'));
      this.fetchVendorData();
    }
  }

  /**
   * Creates and validates the vendor creation form using FormBuilder.
   */
  createAddVendorForm(): void {
    this.addVendorForm = this.fb.group({
      vendorName: [{value:'',disabled: this.isEdit }, [Validators.required, Validators.maxLength(100)]],
      state: [''],
      country: ['', Validators.required],
      markets: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(phonePattern)]],
      website: [''],
      service: ['', Validators.required],
    });
  }

  /**
   * Fetches the list of markets from the backend.
   */
  fetchMarkets(): void {
    this.vendorService.getMarkets().subscribe((data: IDropDownFields[]) => {
      this.markets = data;
    });
  }

  /**
   * Fetches the list of services from the backend.
   */
  fetchServices(): void {
    this.vendorService.getServices().subscribe((data: IDropDownFields[]) => {
      this.services = data;
    });
  }

  /**
   * Fetches the details of particular vendor from backend.
   */
  fetchVendorData(): void {
    if (this.selectedVendorId) {
      this.vendorService.getVendorById(this.selectedVendorId).subscribe((data: IVendorData) => {
          this.vendorData = data;
          this.vendorName=data.name
          this.bindVendorDetails();
        });
    }
  }

  /**
   * method to populate the form with retrieved deatails of vendor.
   */
  bindVendorDetails(): void {
    if (this.vendorData) {
      this.addVendorForm.patchValue({
        vendorName: this.vendorData.name,
        state: this.vendorData.stateProvinceRegion,
        country: this.vendorData.country,
        markets: this.vendorData.markets.map((market) => market.id),
        email: this.vendorData.email,
        phone: this.vendorData.phone,
        website: this.vendorData.website,
        service: this.vendorData.service.id,
      });
    }
  }

  /**
   * Submits the vendor data entered in the form .
   */
  submitVendor(): void {
    const formValue = this.addVendorForm.getRawValue();
    const vendorData: IVendorCreation = {
      name: formValue.vendorName,
      stateProvinceRegion: formValue.state,
      country: formValue.country,
      email: formValue.email,
      phone: formValue.phone,
      website: formValue.website,
      serviceId: formValue.service,
      marketIds: formValue.markets,
    };
  
    if (this.isEdit) {
      this.vendorService.updateVendor(this.selectedVendorId, vendorData).subscribe(
        (response) => {
          this.showSuccess("Vendor Updated successfully");
          this.router.navigate(['/vendor/view/' + this.selectedVendorId]);
        },
        (error) => this.handleError(error)
      );
    } else {
      this.vendorService.addVendor(vendorData).subscribe(
        (response) => {
          this.showSuccess("Vendor Added successfully");
          this.router.navigate(['']);
        },
        (error) => this.handleError(error)
      );
    }
  }

  /**
   * method to handle the errors during submit .
   */
  private handleError(error: any): void {
    const serverErrors = error.error.errors || {};
    let errorMsg = '';
    Object.keys(serverErrors).forEach((key) => {
      errorMsg += `${serverErrors[key].join('; ')} `;
    });
    if (errorMsg) {
      this.showError(errorMsg);
    } else {
      this.showError(error.error.message);
    }
  }
  
  /**
   * method to show error message .
   */
  showError(message : string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  /**
   * method to show success message .
   */
  showSuccess(message : string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
}