import { Component, OnInit } from '@angular/core';
import { IVendorListing } from '../models/vendor.model';
import { VendorService } from '../services/vendor.service';

/**
 * VendorListingComponent
 *
 * This component is responsible for listing all the vendors in the system.
 *
 * Execution Flow
 *
 * The following details will be displayed against each vendor:
 *
 * - Vendor Name
 * - Vendor Status Badge - A "Pending" tag is shown for vendors with `isApproved: false`.
 * - Markets
 * - Service Categories
 * - Email
 *
 * Default sort order: Ascending order of vendor names.
 *
 * This screen contains the following actions:
 *
 * - Add New Vendor: Navigates to the vendor creation page when the "Add New Vendor" button is clicked.
 * - View Vendor Details: The user can click on a row to navigate to the detailed view of that vendor.
 */

@Component({
  selector: 'app-vendor-listing',
  standalone: false,
  templateUrl: './vendor-listing.component.html',
  styleUrl: './vendor-listing.component.scss',
})
export class VendorListingComponent implements OnInit {
  vendors!: IVendorListing[];

  constructor(private vendorService: VendorService) {}
  ngOnInit() {
    this.vendorService.getVendors().subscribe((vendors) => {
      // Transform API response to match the IVendor interface
      this.vendors = vendors.map((vendor: any) => {
        const transformedVendor: IVendorListing = {
          id: vendor.id.toString(),
          name: vendor.name,
          markets: vendor.markets.map((market: any) => market.name),
          serviceCategories: vendor.service.name, // Map service.name to serviceCategories
          email: vendor.email,
          isApproved: vendor.isApproved,
        };
        return transformedVendor;
      });

      // Sort vendors by name in ascending order
      this.vendors.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
}
