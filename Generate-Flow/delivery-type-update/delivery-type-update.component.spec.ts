import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTypeUpdateComponent } from './delivery-type-update.component';

describe('DeliveryTypeUpdateComponent', () => {
  let component: DeliveryTypeUpdateComponent;
  let fixture: ComponentFixture<DeliveryTypeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryTypeUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
