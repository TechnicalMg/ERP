import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page18Component } from './page18.component';

describe('Page18Component', () => {
  let component: Page18Component;
  let fixture: ComponentFixture<Page18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page18Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Page18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
