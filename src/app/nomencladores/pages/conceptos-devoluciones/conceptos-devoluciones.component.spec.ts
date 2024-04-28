import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptosDevolucionesComponent } from './conceptos-devoluciones.component';

describe('ConceptosDevolucionesComponent', () => {
  let component: ConceptosDevolucionesComponent;
  let fixture: ComponentFixture<ConceptosDevolucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptosDevolucionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptosDevolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
