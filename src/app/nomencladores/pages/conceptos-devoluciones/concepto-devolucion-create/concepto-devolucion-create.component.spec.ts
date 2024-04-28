import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoDevolucionCreateComponent } from './concepto-devolucion-create.component';

describe('ConceptoDevolucionCreateComponent', () => {
  let component: ConceptoDevolucionCreateComponent;
  let fixture: ComponentFixture<ConceptoDevolucionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoDevolucionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoDevolucionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
