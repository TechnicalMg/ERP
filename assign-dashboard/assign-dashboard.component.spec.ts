import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDashboardComponent } from './assign-dashboard.component';

describe('AssignDashboardComponent', () => {
  let component: AssignDashboardComponent;
  let fixture: ComponentFixture<AssignDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
