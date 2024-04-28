import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomencladoresMenuComponent } from './nomencladores-menu.component';

describe('NomencladoresMenuComponent', () => {
  let component: NomencladoresMenuComponent;
  let fixture: ComponentFixture<NomencladoresMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomencladoresMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NomencladoresMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
