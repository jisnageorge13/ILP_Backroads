import {  TestBed } from '@angular/core/testing';
import { VendorViewComponent } from './vendor-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorModule } from 'src/app/features/vendor/vendor.module';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VendorService } from '../services/vendor.service';
import { IVendor } from '../models/vendor.model';
import { ConfirmationService, MessageService } from 'primeng/api';

describe('VendorViewComponent', () => {
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorViewComponent],
      imports: [VendorModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => '1',
            }),
            snapshot: {
              paramMap: {
                get: jest.fn().mockReturnValue('1'),
              },
            },
          },
        },
        VendorService,
        ConfirmationService,
        MessageService
      ],
    }).compileComponents();
  });

  const mockVendors: IVendor[] = [
    {
      id: 1,
      name: 'Vendor A',
      stateProvinceRegion: 'Region A',
      country: 'Country A',
      email: 'vendorA@example.com',
      phone: '9743198789',
      website: 'http://vendora.com',
      isApproved: true,
      service: { id: 1, name: 'Service A' },
      markets: [
        { id: 1, name: 'Market A' },
        { id: 2, name: 'Market B' },
      ],
    },
  ];

  const mockVendor = mockVendors[0];

  const setMockSpy = (vendorService: VendorService, router: Router) => {
    const getVendorByIdSpy = jest
      .spyOn(vendorService, 'getVendorById')
      .mockReturnValue(of(mockVendor));
    const approveVendorSpy = jest
      .spyOn(vendorService, 'approveVendor')
      .mockReturnValue(of());
    const routerSpy = jest
      .spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true));

    return {
      getVendorByIdSpy,
      approveVendorSpy,
      routerSpy,
    };
  };

  const setup = () => {
    const fixture = TestBed.createComponent(VendorViewComponent);
    const component = fixture.componentInstance;
    const vendorService = TestBed.inject(VendorService);
    const router = TestBed.inject(Router);
    const spyObj = setMockSpy(vendorService, router);
    const confirmationService = TestBed.inject(ConfirmationService);
    const messageService = TestBed.inject(MessageService);

    fixture.detectChanges();
    return { fixture, component, spyObj, confirmationService, messageService};
  };

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should initialize component on init', () => {
    const { component } = setup();
    component.ngOnInit();
    component.selectedVendorId = 1;
    expect(component.selectedVendorId).toBe(1);
  });

  it('should navigate to the edit vendor profile page', () => {
    const { component, spyObj } = setup();
    component.navigateToEdit(mockVendor.id);
    expect(spyObj.routerSpy).toHaveBeenCalledWith([
      '/vendor/edit/' + mockVendor.id,
    ]);
  });

  it('should display a success message when vendor is approved', () => {
    const { component, messageService } = setup();
    const addMessageSpy = jest.spyOn(messageService, 'add').mockImplementation(() => {});
    component.vendor = mockVendor;
    component.showSuccess('Vendor Approved Successfully');
    expect(addMessageSpy).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Vendor Approved Successfully',
    });
  });  
});