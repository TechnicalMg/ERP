import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAmcBifurcateComponent } from './view-amc-bifurcate.component';

describe('ViewAmcBifurcateComponent', () => {
  let component: ViewAmcBifurcateComponent;
  let fixture: ComponentFixture<ViewAmcBifurcateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAmcBifurcateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAmcBifurcateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
