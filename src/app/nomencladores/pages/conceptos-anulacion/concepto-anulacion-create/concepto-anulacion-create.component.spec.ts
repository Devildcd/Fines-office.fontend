import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoAnulacionCreateComponent } from './concepto-anulacion-create.component';

describe('ConceptoAnulacionCreateComponent', () => {
  let component: ConceptoAnulacionCreateComponent;
  let fixture: ComponentFixture<ConceptoAnulacionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoAnulacionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoAnulacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
