import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptosTrasladoComponent } from './conceptos-traslado.component';

describe('ConceptosTrasladoComponent', () => {
  let component: ConceptosTrasladoComponent;
  let fixture: ComponentFixture<ConceptosTrasladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptosTrasladoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptosTrasladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
