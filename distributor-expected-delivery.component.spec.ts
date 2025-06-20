import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorExpectedDeliveryComponent } from './distributor-expected-delivery.component';

describe('DistributorExpectedDeliveryComponent', () => {
  let component: DistributorExpectedDeliveryComponent;
  let fixture: ComponentFixture<DistributorExpectedDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributorExpectedDeliveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributorExpectedDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
