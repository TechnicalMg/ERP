import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageIssuedPObillComponent } from './page-issued-pobill.component';

describe('PageIssuedPObillComponent', () => {
  let component: PageIssuedPObillComponent;
  let fixture: ComponentFixture<PageIssuedPObillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageIssuedPObillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageIssuedPObillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
