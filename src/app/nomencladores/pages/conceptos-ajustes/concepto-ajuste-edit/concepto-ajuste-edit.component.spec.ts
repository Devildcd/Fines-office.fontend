import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoAjusteEditComponent } from './concepto-ajuste-edit.component';

describe('ConceptoAjusteEditComponent', () => {
  let component: ConceptoAjusteEditComponent;
  let fixture: ComponentFixture<ConceptoAjusteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoAjusteEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoAjusteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
