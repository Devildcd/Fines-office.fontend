import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecretoLeyArticuloIncisoCreateComponent } from './decreto-ley-articulo-inciso-create.component';

describe('DecretoLeyArticuloIncisoCreateComponent', () => {
  let component: DecretoLeyArticuloIncisoCreateComponent;
  let fixture: ComponentFixture<DecretoLeyArticuloIncisoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecretoLeyArticuloIncisoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecretoLeyArticuloIncisoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
