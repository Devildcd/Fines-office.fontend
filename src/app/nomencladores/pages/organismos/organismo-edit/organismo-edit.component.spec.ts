import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismoEditComponent } from './organismo-edit.component';

describe('OrganismoEditComponent', () => {
  let component: OrganismoEditComponent;
  let fixture: ComponentFixture<OrganismoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganismoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganismoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
