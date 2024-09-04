import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { MenuItem } from "primeng/api";
import { filter, distinctUntilChanged, map } from "rxjs/operators";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})

/**
 * BreadcrumbComponent
 * Purpose:
 * - Dynamically generates and updates breadcrumb navigation based on the current route.
 * - Allow users to navigate using breadcrumb items.
 *
 * Fields:
 * - breadcrumbItems: MenuItem[] - Stores the breadcrumb items.
 * - home: MenuItem - Represents the home breadcrumb item.
 * - url: string - Tracks the current URL as breadcrumbs are constructed.
 *
 * Methods:
 * - ngOnInit(): Initializes the home breadcrumb item and subscribes to route events.
 * - buildBreadcrumb(route: ActivatedRoute): MenuItem[] - builds the breadcrumb list by traversing the route.
 * - updateBreadcrumbs(breadcrumbs: MenuItem[], newVendorListing: MenuItem[]): MenuItem[] - Updates the breadcrumb list by comparing with new breadcrumbs.
 * - onBreadcrumbClick(item: string): Navigates based on the breadcrumb item clicked by the user.
 */

export class BreadcrumbComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  home!: MenuItem;
  url = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.home = { icon: "pi pi-home", routerLink: "" };
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged(),
        map(() => this.buildBreadcrumb(this.activatedRoute.root))
      )
      .subscribe((data) => {
        const updatedBreadcrumbs = this.updateBreadcrumbs(
          this.breadcrumbItems,
          data
        );
        this.breadcrumbItems = updatedBreadcrumbs;
      });
  }

  /**
   * method to get the path and label of current path
   * @param { ActivatedRoute } route
   * @returns { MenuItem[] }
   */
  buildBreadcrumb(route: ActivatedRoute): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    for (const child of children) {
      const segment = child.snapshot.url
        .map((segment) => segment.path)
        .join("/");
      if (segment) {
        this.url += `/${segment}`;
      }
      const label = child.snapshot.data["breadcrumb"];
      if (label) {
        this.breadcrumbItems.push({ label, routerLink: this.url });
      }
      this.buildBreadcrumb(child);
    }
    return this.breadcrumbItems;
  }

  /**
   * method to update the breadcrumbt array with current path
   * @param { MenuItem[] } breadcrumbs
   * @param { MenuItem[] } newVendorListing
   */
  updateBreadcrumbs(breadcrumbs: MenuItem[], newVendorListing: MenuItem[]) {
    const newVendorLabel = newVendorListing[newVendorListing.length - 1].label;
    if (newVendorLabel === undefined) {
      return breadcrumbs;
    }
    const index = breadcrumbs.findIndex((breadcrumb) =>
      breadcrumb.label?.includes(newVendorLabel)
    );

    if (index !== -1) {
      return breadcrumbs.slice(0, index + 1);
    } else {
      return breadcrumbs;
    }
  }
  /**
   * method to navigate using the breadcrumb
   * @param { string } item
   */
  onBreadcrumbClick(item: string) {
    const segments = item.split("/");
    const lastIndex = segments.length - 1;
    const secondLastIndex = lastIndex - 1;
    if (!item) {
      this.breadcrumbItems = [];
    }
    this.router.navigate([
      "/vendor/" + segments[secondLastIndex] + "/" + segments[lastIndex],
    ]);
  }
}