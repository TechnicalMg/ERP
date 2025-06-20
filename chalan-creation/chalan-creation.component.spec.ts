import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChalanCreationComponent } from './chalan-creation.component';

describe('ChalanCreationComponent', () => {
  let component: ChalanCreationComponent;
  let fixture: ComponentFixture<ChalanCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChalanCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChalanCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
