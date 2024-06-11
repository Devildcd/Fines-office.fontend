import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticacionMenuComponent } from './autenticacion-menu.component';

describe('AutenticacionMenuComponent', () => {
  let component: AutenticacionMenuComponent;
  let fixture: ComponentFixture<AutenticacionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutenticacionMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutenticacionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
