import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleUserMappingListComponent } from './role-user-mapping-list.component';

describe('RoleUserMappingListComponent', () => {
  let component: RoleUserMappingListComponent;
  let fixture: ComponentFixture<RoleUserMappingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleUserMappingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleUserMappingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
