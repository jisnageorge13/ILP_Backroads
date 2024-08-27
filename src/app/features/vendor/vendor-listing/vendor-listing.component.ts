import { Component, OnInit } from '@angular/core';
import { IVendor } from '../models/vendor.model';

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
  vendors!: IVendor[];

  ngOnInit() {
    //dummy data for vendor listing
    // this.vendors = [
    //   {
    //     id: 1,
    //     name: 'Vendor A',
    //     stateProvinceRegion: 'California',
    //     country: 'USA',
    //     markets: ['USA', 'Canada'],
    //     serviceCategories: 'IT Services',
    //     email: 'vendorA@example.com',
    //     phone: '123-456-7890',
    //     website: 'https://vendorA.com',
    //     isApproved: true,
    //   },
    //   {
    //     id: 2,
    //     name: 'Vendor B',
    //     stateProvinceRegion: 'Berlin',
    //     country: 'Germany',
    //     markets: ['Europe'],
    //     serviceCategories: 'Manufacturing',
    //     email: 'vendorB@example.com',
    //     phone: '234-567-8901',
    //     isApproved: false,
    //   },
    //   {
    //     id: 3,
    //     name: 'Vendor C',
    //     country: 'Australia',
    //     markets: ['Asia', 'Australia'],
    //     serviceCategories: 'Healthcare',
    //     email: 'vendorC@example.com',
    //     phone: '345-678-9012',
    //     website: 'https://vendorC.com',
    //     isApproved: true,
    //   },
    //   {
    //     id: 4,
    //     name: 'Vendor D',
    //     country: 'Brazil',
    //     markets: ['South America'],
    //     serviceCategories: 'Construction',
    //     email: 'vendorD@example.com',
    //     phone: '456-789-0123',
    //     isApproved: false,
    //   },
    // ];

    // Sort vendors by name in ascending order
    this.vendors.sort((a, b) => a.name.localeCompare(b.name));
  }
}
