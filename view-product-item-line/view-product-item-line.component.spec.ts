import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductItemLineComponent } from './view-product-item-line.component';

describe('ViewProductItemLineComponent', () => {
  let component: ViewProductItemLineComponent;
  let fixture: ComponentFixture<ViewProductItemLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProductItemLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProductItemLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
