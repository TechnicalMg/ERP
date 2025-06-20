import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDeliveryInvoiceBillComponent } from './vendor-delivery-invoice-bill.component';

describe('VendorDeliveryInvoiceBillComponent', () => {
  let component: VendorDeliveryInvoiceBillComponent;
  let fixture: ComponentFixture<VendorDeliveryInvoiceBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorDeliveryInvoiceBillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorDeliveryInvoiceBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
