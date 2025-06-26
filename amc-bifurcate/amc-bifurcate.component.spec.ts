import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcBifurcateComponent } from './amc-bifurcate.component';

describe('AmcBifurcateComponent', () => {
  let component: AmcBifurcateComponent;
  let fixture: ComponentFixture<AmcBifurcateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmcBifurcateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmcBifurcateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
