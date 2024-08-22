import { Component,OnInit } from '@angular/core';
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
 *
 * Component Structure
 *
 * - VendorListingComponent: Displays a list of vendors with a table, header, and button for adding new vendors.
 * - Vendor Interface: Defines vendor properties used in the component.
 *
 * Routing
 *
 * - Module: VendorRoutingModule
 * - Routes:
 *      - /vendor: Default route to list vendors.
 *      - /vendor/creation: Route to vendor creation page.
 *
 * Data Model
 *
 * - Vendor Interface:
 *      - Fields used: `name`, `markets`, `serviceCategories`, `email`, `isApproved`.
 *
 * Component Design
 *
 * - HTML Structure:
 *      - Header Section: Contains "All Vendors" heading and "Add New Vendor" button with a plus sign.
 *      - Table: Displays vendors with columns for `Vendor Name`, `Markets`, `Service Categories`, and `Email`. Adds a "Pending" tag for unapproved vendors.
 *
 * - Styling:
 *      - The header section has a light gray background.
 *      - The "Add New Vendor" button is styled with a blue background and white text.
 *
 * Behavior & Logic
 *
 * - Initialization: The `vendors` array is populated with hardcoded data.
 * - Add New Vendor Button: Navigates to the `/vendor/creation` route when clicked.
 */



@Component({
  selector: 'app-listing',
  standalone: false,
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss',
})

export class ListingComponent implements OnInit {
  vendors!: IVendor[];
  ngOnInit() {
    //dummy data for vendor listing
    this.vendors = [
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
}