import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
export class VendorListingComponent  {
  vendors!: any[];
 constructor(private router : Router){}
}