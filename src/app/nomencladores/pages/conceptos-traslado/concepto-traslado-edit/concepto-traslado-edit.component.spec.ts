import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoTrasladoEditComponent } from './concepto-traslado-edit.component';

describe('ConceptoTrasladoEditComponent', () => {
  let component: ConceptoTrasladoEditComponent;
  let fixture: ComponentFixture<ConceptoTrasladoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoTrasladoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoTrasladoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
