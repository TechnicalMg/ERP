import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserMenuComponent } from './create-user-menu.component';

describe('CreateUserMenuComponent', () => {
  let component: CreateUserMenuComponent;
  let fixture: ComponentFixture<CreateUserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
