import { Component,OnInit } from '@angular/core';
import { Vendor } from '../models/vendor.model';

// LLD
// 1. Component Structure

//     Component:
//         VendorListingComponent: Displays a list of vendors with a table, header, and button for adding new vendors.

//     Interface:
//         Vendor: Defines vendor properties used in the component.

// 2. Routing

//     Module: VendorRoutingModule
//     Routes:
//         /vendor: Default route to list vendors.
//         /vendor/creation: Route to vendor creation page.

// 3. Data Model

//     Vendor Interface:
//         Fields used: name, markets, serviceCategories, email, isApproved.

// 4. Component Design

//     HTML Structure:
//         Header Section: Contains "All Vendors" heading and "Add New Vendor" button with a plus icon.
//         Table: Displays vendors with columns for Vendor Name, Markets, Service Categories, and Email. Adds a "Pending" tag for unapproved vendors.

//     Styling:
//         Header section has a light gray background.
//         Button styled with blue background and white text.

// 5. Behavior & Logic

//     Initialization: vendors array populated with hardcoded data.
//     Add New Vendor Button: Navigates to the /vendor/creation route.



@Component({
  selector: 'app-listing',
  standalone: false,
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss',
})
export class ListingComponent implements OnInit {
  vendors!: Vendor[];
  ngOnInit() {
    //dummy data for vendor listing
    this.vendors = [
      {
        id: '1',
        name: 'Vendor A',
        state: 'California',
        country: 'USA',
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
        markets: ['South America'],
        serviceCategories: 'Construction',
        email: 'vendorD@example.com',
        phone: '456-789-0123',
        isApproved: false,
      },
    ];
  }
}