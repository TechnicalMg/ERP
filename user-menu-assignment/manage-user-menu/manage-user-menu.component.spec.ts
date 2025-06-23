import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserMenuComponent } from './manage-user-menu.component';

describe('ManageUserMenuComponent', () => {
  let component: ManageUserMenuComponent;
  let fixture: ComponentFixture<ManageUserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageUserMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
