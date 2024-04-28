import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoAjusteShowComponent } from './concepto-ajuste-show.component';

describe('ConceptoAjusteShowComponent', () => {
  let component: ConceptoAjusteShowComponent;
  let fixture: ComponentFixture<ConceptoAjusteShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoAjusteShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoAjusteShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
