import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePOCComponent } from './page-poc.component';

describe('PagePOCComponent', () => {
  let component: PagePOCComponent;
  let fixture: ComponentFixture<PagePOCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePOCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
