import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInspectionComponent } from './item-inspection.component';

describe('ItemInspectionComponent', () => {
  let component: ItemInspectionComponent;
  let fixture: ComponentFixture<ItemInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemInspectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
