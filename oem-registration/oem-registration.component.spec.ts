import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OemRegistrationComponent } from './oem-registration.component';

describe('OemRegistrationComponent', () => {
  let component: OemRegistrationComponent;
  let fixture: ComponentFixture<OemRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OemRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OemRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
