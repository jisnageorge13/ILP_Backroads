import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { VendorCreationComponent } from './vendor-creation.component';
import { VendorService } from '../services/vendor.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { IDropDownFields } from '../models/vendor.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { VendorModule } from 'src/app/features/vendor/vendor.module';

describe('VendorCreationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorCreationComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        SharedModule,
        VendorModule,
        RouterTestingModule,
      ],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { rotationCode: 'AL-350' },
              url: [{ path: 'edit' }, { path: 'AL-350' }],
            },
          },
        },
        { provide: Router, useValue: urlValue },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } },
          },
        },
        { provide: MessageService, useValue: { add: jest.fn() } },
        VendorService,
      ],
    }).compileComponents();
  });

  const setup = () => {
    const fixture = TestBed.createComponent(VendorCreationComponent);
    const component = fixture.componentInstance;
    const vendorService = TestBed.inject(VendorService);
    const router = TestBed.inject(Router);
    const messageService = TestBed.inject(MessageService);
    const spyObj = setMockSpy(vendorService, router, messageService);
    return { fixture, component, router, spyObj, vendorService };
  };

  const getVendorData = () => ({
    id: 1,
    name: 'Vendor 1',
    stateProvinceRegion: 'California',
    country: 'USA',
    email: 'vendor1@example.com',
    phone: '1234567890',
    website: 'https://vendor1.com',
    isApproved: true,
    service: { id: 1, name: 'Food' },
    markets: [{ id: 1, name: 'India' }],
  });

  const getVendorServiceFormMock = (): FormGroup => {
    return new FormGroup({
      vendorName: new FormControl('Vendor A'),
      state: new FormControl('California'),
      country: new FormControl('USA'),
      markets: new FormControl([1]),
      email: new FormControl('vendor@example.com'),
      phone: new FormControl('1234567890'),
      website: new FormControl('vendor.com'),
      service: new FormControl(1),
    });
  };

  const returnResponse = () => ({
    name: 'Vendor A',
    state: 'California',
    country: 'USA',
    marketIds: [1],
    email: 'vendor@example.com',
    phone: '1234567890',
    website: 'https://vendor.com',
    serviceId: 1,
  });

  const getService = (): IDropDownFields[] => [
    {
      id: 1,
      name: 'hotel',
    },
  ];

  const getMarkets = (): IDropDownFields[] => [
    {
      id: 1,
      name: 'India',
    },
  ];

  const getUniqueNameErrorResponse = () =>({
   error: {
    errors: {},
    message: 'A general error occurred',
   },
  });

  const setMockSpy = (
    vendorService: VendorService, router: Router, messageService: MessageService
  ) => {
    const getMarketsSpy = jest.spyOn(vendorService, 'getMarkets').mockImplementation(() => of(getMarkets()));
    const getServicesSpy = jest.spyOn(vendorService, 'getServices').mockImplementation(() => of(getService()));
    const getVendorByIdSpy = jest.spyOn(vendorService, 'getVendorById').mockImplementation(() => of(getVendorData()));
    const addVendorSpy = jest.spyOn(vendorService, 'addVendor').mockImplementation(() => of(returnResponse()));
    const updateVendorSpy = jest.spyOn(vendorService, 'updateVendor').mockImplementation(() => of(returnResponse()));
    const routerSpy = jest.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));
    const messageServiceSpy = jest.spyOn(messageService, 'add').mockImplementation(() => {});
    return {
      getMarketsSpy,
      getServicesSpy,
      getVendorByIdSpy,
      addVendorSpy,
      updateVendorSpy,
      routerSpy,
      messageServiceSpy,
    };
  };
  let urlValue = { url: 'vendor/creation', navigate: jest.fn() };

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should create vendor form when component initializes', () => {
    const { component } = setup();
    component.ngOnInit();
    expect(component.addVendorForm).toBeDefined();
  });

  it('should populate data when user open edit screen', () => {
    const { component } = setup();
    urlValue.url = 'vendor/edit/1';
    component.ngOnInit();
    expect(component.addVendorForm.get('vendorName')?.value).toBe('Vendor 1');
  });

  it('should update the vendor data when user submits the updated form', () => {
    const { component, spyObj } = setup();
    component.isEdit = true;
    component.selectedVendorId = 1;
    component.addVendorForm = getVendorServiceFormMock();
    component.submitVendor();
    expect(spyObj.updateVendorSpy).toHaveBeenCalled();
  });

  it('should add the vendor data when user submits the form', () => {
    const { component, spyObj } = setup();
    component.isEdit = false;
    component.addVendorForm = getVendorServiceFormMock();
    component.submitVendor();
    expect(spyObj.addVendorSpy).toHaveBeenCalled();
  });

  it('should show error if vendor name is not unique when user submits the form', () => {
    const { component, spyObj } = setup();
    component.addVendorForm = getVendorServiceFormMock();
    const errorResponse = getUniqueNameErrorResponse();
    spyObj.addVendorSpy.mockReturnValue(throwError(() => errorResponse));
    component.submitVendor();
    expect(spyObj.messageServiceSpy).toHaveBeenCalled();
  });

  it('Should return false when isEdit is false', () => {
    const { component } = setup();
    component.isEdit = false;
    component.addVendorForm = getVendorServiceFormMock();
    component.initialData = component.addVendorForm.getRawValue();
    expect(component.isFormChanged()).toBe(false);
  });

  it('Should indicate no changes have been made when the form values are the same as they were initially', () => {
    const { component } = setup();
    component.isEdit = true;
    component.addVendorForm = getVendorServiceFormMock();
    component.initialData = component.addVendorForm.getRawValue();
    expect(component.isFormChanged()).toBe(true);
  });

  it('Should indicate changes have been made when the form values are modified after filling them in', () => {
    const { component } = setup();
    component.isEdit = true;
    component.addVendorForm = getVendorServiceFormMock();
    component.initialData = component.addVendorForm.getRawValue();
    component.addVendorForm.patchValue({ vendorName: 'Changed Vendor' });
    expect(component.isFormChanged()).toBe(false);
  });

  it('should show confirmation popup when user clicks on cancel button', () => {
    const { component } = setup();
    component.showConfirmationPopUp();
    expect(component.isConfirmPopupVisible).toBe(true);
  });

  it('should navigate to vendor listing screen when user clicks on yes in the confirmation popup for cancel button', () => {
    const { component, spyObj } = setup();
    component.handleConfirmationApproval();
    expect(spyObj.routerSpy).toHaveBeenCalledWith(['']);
  });

  it('should stop showing cnofirmation popip when user clicks on "No" button', () => {
    const { component } = setup();
    component.handleRejection()
    expect(component.isConfirmPopupVisible).toBe(false);
  })
});