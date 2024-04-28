import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoTrasladoCreateComponent } from './concepto-traslado-create.component';

describe('ConceptoTrasladoCreateComponent', () => {
  let component: ConceptoTrasladoCreateComponent;
  let fixture: ComponentFixture<ConceptoTrasladoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoTrasladoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoTrasladoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
