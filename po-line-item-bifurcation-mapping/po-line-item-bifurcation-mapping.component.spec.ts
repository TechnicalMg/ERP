import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoLineItemBifurcationMappingComponent } from './po-line-item-bifurcation-mapping.component';

describe('PoLineItemBifurcationMappingComponent', () => {
  let component: PoLineItemBifurcationMappingComponent;
  let fixture: ComponentFixture<PoLineItemBifurcationMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoLineItemBifurcationMappingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoLineItemBifurcationMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
