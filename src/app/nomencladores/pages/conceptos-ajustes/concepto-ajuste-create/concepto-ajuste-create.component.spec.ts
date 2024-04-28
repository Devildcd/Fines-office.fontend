import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoAjusteCreateComponent } from './concepto-ajuste-create.component';

describe('ConceptoAjusteCreateComponent', () => {
  let component: ConceptoAjusteCreateComponent;
  let fixture: ComponentFixture<ConceptoAjusteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoAjusteCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoAjusteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
