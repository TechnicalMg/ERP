import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdDashComponent } from './md-dash.component';

describe('MdDashComponent', () => {
  let component: MdDashComponent;
  let fixture: ComponentFixture<MdDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
