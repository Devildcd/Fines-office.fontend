import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecretoLeyArticuloIncisoEditComponent } from './decreto-ley-articulo-inciso-edit.component';

describe('DecretoLeyArticuloIncisoEditComponent', () => {
  let component: DecretoLeyArticuloIncisoEditComponent;
  let fixture: ComponentFixture<DecretoLeyArticuloIncisoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecretoLeyArticuloIncisoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecretoLeyArticuloIncisoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
