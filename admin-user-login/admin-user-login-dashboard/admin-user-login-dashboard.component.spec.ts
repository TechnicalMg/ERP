import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserLoginDashboardComponent } from './admin-user-login-dashboard.component';

describe('AdminUserLoginDashboardComponent', () => {
  let component: AdminUserLoginDashboardComponent;
  let fixture: ComponentFixture<AdminUserLoginDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserLoginDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserLoginDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
