import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismoShowComponent } from './organismo-show.component';

describe('OrganismoShowComponent', () => {
  let component: OrganismoShowComponent;
  let fixture: ComponentFixture<OrganismoShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganismoShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganismoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
