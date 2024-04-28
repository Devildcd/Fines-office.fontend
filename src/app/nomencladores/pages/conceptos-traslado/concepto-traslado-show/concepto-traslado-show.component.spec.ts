import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoTrasladoShowComponent } from './concepto-traslado-show.component';

describe('ConceptoTrasladoShowComponent', () => {
  let component: ConceptoTrasladoShowComponent;
  let fixture: ComponentFixture<ConceptoTrasladoShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoTrasladoShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoTrasladoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
