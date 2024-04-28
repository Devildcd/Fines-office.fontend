import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoDevolucionEditComponent } from './concepto-devolucion-edit.component';

describe('ConceptoDevolucionEditComponent', () => {
  let component: ConceptoDevolucionEditComponent;
  let fixture: ComponentFixture<ConceptoDevolucionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoDevolucionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoDevolucionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
