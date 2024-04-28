import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoAnulacionEditComponent } from './concepto-anulacion-edit.component';

describe('ConceptoAnulacionEditComponent', () => {
  let component: ConceptoAnulacionEditComponent;
  let fixture: ComponentFixture<ConceptoAnulacionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoAnulacionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoAnulacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
