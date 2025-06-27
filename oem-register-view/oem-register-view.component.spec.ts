import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OemRegisterViewComponent } from './oem-register-view.component';

describe('OemRegisterViewComponent', () => {
  let component: OemRegisterViewComponent;
  let fixture: ComponentFixture<OemRegisterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OemRegisterViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OemRegisterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
