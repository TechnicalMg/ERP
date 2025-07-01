import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePDIComponent } from './page-pdi.component';

describe('PagePDIComponent', () => {
  let component: PagePDIComponent;
  let fixture: ComponentFixture<PagePDIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePDIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePDIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
