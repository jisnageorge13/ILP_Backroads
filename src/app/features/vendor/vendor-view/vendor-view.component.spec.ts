import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VendorViewComponent } from './vendor-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { VendorService } from '../services/vendor.service';
import { IVendor } from '../models/vendor.model';
import { of } from 'rxjs';

describe('VendorViewComponent', () => {
  const mockVendors: IVendor[] = [
    {
      id: 1,
      name: 'Vendor A',
      stateProvinceRegion: 'Region A',
      country: 'Country A',
      email: 'vendorA@example.com',
      phone: '9999999999',
      website: 'http://vendora.com',
      isApproved: true,
      service: { id: 1, name: 'Service A' },
      markets: [
        { id: 1, name: 'Market A' },
        { id: 2, name: 'Market B' },
      ],
    },
    {
      id: 2,
      name: 'Vendor B',
      stateProvinceRegion: 'Region B',
      country: 'Country B',
      email: 'vendorB@example.com',
      phone: '9879879861',
      website: 'http://vendorb.com',
      isApproved: false,
      service: { id: 2, name: 'Service B' },
      markets: [
        { id: 2, name: 'Market B' },
        { id: 3, name: 'Market C' },
      ],
    },
    {
      id: 3,
      name: 'Vendor C',
      stateProvinceRegion: 'Region C',
      country: 'Country C',
      email: 'vendorC@example.com',
      phone: '9090909090',
      website: 'http://vendorc.com',
      isApproved: true,
      service: { id: 3, name: 'Service C' },
      markets: [
        { id: 1, name: 'Market A' },
        { id: 3, name: 'Market C' },
      ],
    },
  ];
  const setMockSpy = (vendorService: VendorService) => {
    const getVendorsSpy = jest
      .spyOn(vendorService, 'getVendors')
      .mockImplementation(() => of(mockVendors));
    return { getVendorsSpy };
  };

  const setup = () => {
    const fixture = TestBed.createComponent(VendorViewComponent);
    const component = fixture.componentInstance;
    const vendorService = TestBed.inject(VendorService);
    const spyObj = setMockSpy(vendorService);
    return { fixture, component, spyObj };
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorViewComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } },
          },
        },
        { provide: ConfirmationService, useValue: { add: jest.fn() } },
        { provide: HttpClient, useValue: { add: jest.fn() } },
        VendorService,
      ],
      imports: [ConfirmDialogModule],
    }).compileComponents();
  });

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
    
  });
});
