import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryWaysComponent } from './delivery-ways.component';

describe('DeliveryWaysComponent', () => {
  let component: DeliveryWaysComponent;
  let fixture: ComponentFixture<DeliveryWaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryWaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryWaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
