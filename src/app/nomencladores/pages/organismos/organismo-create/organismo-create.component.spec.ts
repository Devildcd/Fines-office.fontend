import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismoCreateComponent } from './organismo-create.component';

describe('OrganismoCreateComponent', () => {
  let component: OrganismoCreateComponent;
  let fixture: ComponentFixture<OrganismoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganismoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganismoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
