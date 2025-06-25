import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGenerateOrderProductComponent } from './view-generate-order-product.component';

describe('ViewGenerateOrderProductComponent', () => {
  let component: ViewGenerateOrderProductComponent;
  let fixture: ComponentFixture<ViewGenerateOrderProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewGenerateOrderProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGenerateOrderProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
