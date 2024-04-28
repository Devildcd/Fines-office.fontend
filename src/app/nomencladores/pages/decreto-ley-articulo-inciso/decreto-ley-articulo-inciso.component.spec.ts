import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecretoLeyArticuloIncisoComponent } from './decreto-ley-articulo-inciso.component';

describe('DecretoLeyArticuloIncisoComponent', () => {
  let component: DecretoLeyArticuloIncisoComponent;
  let fixture: ComponentFixture<DecretoLeyArticuloIncisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecretoLeyArticuloIncisoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecretoLeyArticuloIncisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
