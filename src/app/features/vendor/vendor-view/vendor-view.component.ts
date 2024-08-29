import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VendorService } from '../services/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IVendor } from '../models/vendor.model';

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
  selector: 'app-vendor-view',
  templateUrl: './vendor-view.component.html',
  styleUrl: './vendor-view.component.scss',
})
export class VendorViewComponent {
  vendor!: IVendor;

  constructor(
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private vendorService: VendorService,
    private router: Router,
    private messageService: MessageService
  ) {}

  /**
   * On component initialization, fetches the vendor details
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.getVendorById(id);
      }
    });
  }

  /**  Function to fetch the details of a vendor by their ID.
   *  @param id - The ID of the vendor to be edited.
   */
  getVendorById(id: number): void {
    this.vendorService.getVendorById(id).subscribe((data: IVendor) => {
      this.vendor = data;
    });
  }

  /**
   * Method to show confirm pop up to approve the vendor.
   */
  confirmApproval(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to approve this vendor?',
      accept: () => {
        this.approveVendor();
      },
    });
  }

  /**
   * Method to approve the vendor by updating their status to approved.
   */
  approveVendor(): void {
    this.vendorService.approveVendor(this.vendor.id).subscribe(() => {
      this.showSuccess('Vendor Approved Successfully');
    });
  }

  /**
   * Navigates to the edit vendor profile page.
   * @param id - The ID of the vendor to be edited.
   */
  navigateToEdit(id: number): void {
    this.router.navigate(['/vendor/edit/' + id]);
  }

  /**
   * method to show success message.
   */
  showSuccess(message: string): void {
    this.getVendorById(this.vendor.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `${message}`,
    });
  }
}
