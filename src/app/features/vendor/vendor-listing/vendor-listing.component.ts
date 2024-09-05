import { Component, OnInit } from '@angular/core';
import { IVendor } from '../models/vendor.model';
import { VendorService } from '../services/vendor.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/service/loading.service';
/**
 * VendorListingComponent
 * This component is responsible for listing all the vendors in the system.
 * Execution Flow
 * The following details will be displayed against each vendor:
 * Vendor Name
 * Vendor Status Badge - A 'Pending' tag is shown for vendors with `isApproved: false`.
 * Markets
 * Service Categories
 * Email
 * Default sort order: Ascending order of vendor names.
 * This screen contains the following actions:
 * Add New Vendor: Navigates to the vendor creation page when the 'Add New Vendor' button is clicked.
 * View Vendor Details: The user can click on a row to navigate to the detailed view of that vendor.
 */

@Component({
  selector: 'app-vendor-listing',
  templateUrl: './vendor-listing.component.html',
  styleUrl: './vendor-listing.component.scss',
})
export class VendorListingComponent implements OnInit {
  vendors!: IVendor[];
  originalData!: IVendor[];
  totalRecords!: number;
  page!: number;
  row!: number;

  constructor(
    private vendorService: VendorService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.showLoader();
  }

  onPageChange(first?: number, rows?: number | null): void {
    if (first !== undefined && rows !== undefined && rows !== null) {
       this.page = first / rows;
       this.row = rows
      this.fetchVendors(this.page + 1, rows, '');
    } 
  }
 
  /**
   * Method to get the list of vendors
   */
  fetchVendors(pageNumber: number, pageSize: number, searchTerm: string): void {
    this.vendorService.getVendors(pageNumber, pageSize, searchTerm).subscribe((response) => {
      this.vendors = response.vendors;
      this.totalRecords = response.totalItems;
      this.vendors.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  /**
   * Method to get the list of vendors
   */
  navigateToView(event: IVendor): void {
    this.router.navigate(['/vendor/view/' + event.id]);
  }

  /**
   * Method to search a vendor by name
   */
  filterGlobal(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.fetchVendors(this.page + 1, this.row, value);
  }
}