import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { IVendor, VendorService } from '../services/vendor.service';
import { Router } from '@angular/router';

/**  LLD

 * This component is for viewing a particular vendor's details

 * It displays the following information:
 * In the header section,Displays the name of the vendor and if the vendor is not yet approved a pending status label will be shown besides the name .
 * Includes action buttons for "Edit Profile" and "Approve Vendor."
 * 
 * In the content section the folowing details are displayed
 * email
 * phone number
 * website
 * market
 * services
 * 
 * It has the following buttons:
 * Edit Profile
 * Approve Vendor

 * This screen contains the following actions:
 * Display the specific vendor's details
 * Navigate to the edit vendor profile page when clicked on the Edit profile button.
 * Approve the vendor's status from pending to approved when the user clicks the Approve Vendor button. 
 */

@Component({
  selector: 'r2q-vendor-view',
  standalone: false,
  templateUrl: './vendor-view.component.html',
  styleUrl: './vendor-view.component.scss',
  providers:[ConfirmationService]
})

export class VendorViewComponent {
  vendor!: IVendor;
  constructor(
    private confirmationService: ConfirmationService,
    private vendorService: VendorService,
    private router: Router
  ) {}

  /** 
   * On component initialization, fetches the vendor details
   */
  ngOnInit(): void {
    this.getVendorById(2);
  }

  /**  Function to fetch the details of a vendor by their ID.
   *  @param id - The ID of the vendor to be edited.
   */
  getVendorById(id: number): void {
    this.vendorService.getVendorById(2).subscribe({
      next: (data) => {
        this.vendor = data;
      },
    });
  }

  /**  
   * Prompt to the user to confirm if they want to approve the vendor.If confirmed, triggers the approval process.
   */
  confirmApproval() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to approve this vendor?',
      accept: () => {
       this.approveVendor();
      },
    });
  }

  /**
   * Function to approve the vendor by updating their status to approved.
   */
  approveVendor(): void {
    this.vendorService.approveVendor(this.vendor.id).subscribe({
      next: () => {
        this.vendor.isApproved = true;
      },
    });
  }

  /** 
   * Navigates to the edit vendor profile page.
   * @param id - The ID of the vendor to be edited.
   */
  navigateToEdit(id: number) {
    console.log('edit');
    this.router.navigate(['/vendor/edit'], { state: { id: id } });
  }
}
