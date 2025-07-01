import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedPoChalanComponent } from './issued-po-chalan.component';

describe('IssuedPoChalanComponent', () => {
  let component: IssuedPoChalanComponent;
  let fixture: ComponentFixture<IssuedPoChalanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuedPoChalanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuedPoChalanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
