import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalAcknowledgementComponent } from './final-acknowledgement.component';

describe('FinalAcknowledgementComponent', () => {
  let component: FinalAcknowledgementComponent;
  let fixture: ComponentFixture<FinalAcknowledgementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalAcknowledgementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalAcknowledgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
