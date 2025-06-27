import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorRegisterViewComponent } from './distributor-register-view.component';

describe('DistributorRegisterViewComponent', () => {
  let component: DistributorRegisterViewComponent;
  let fixture: ComponentFixture<DistributorRegisterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributorRegisterViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributorRegisterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
