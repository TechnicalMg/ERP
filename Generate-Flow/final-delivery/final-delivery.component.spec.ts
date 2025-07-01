import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalDeliveryComponent } from './final-delivery.component';

describe('FinalDeliveryComponent', () => {
  let component: FinalDeliveryComponent;
  let fixture: ComponentFixture<FinalDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalDeliveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
