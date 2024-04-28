import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoDevolucionShowComponent } from './concepto-devolucion-show.component';

describe('ConceptoDevolucionShowComponent', () => {
  let component: ConceptoDevolucionShowComponent;
  let fixture: ComponentFixture<ConceptoDevolucionShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoDevolucionShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoDevolucionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
