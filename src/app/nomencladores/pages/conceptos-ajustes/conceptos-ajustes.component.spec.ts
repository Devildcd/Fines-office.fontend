import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptosAjustesComponent } from './conceptos-ajustes.component';

describe('ConceptosAjustesComponent', () => {
  let component: ConceptosAjustesComponent;
  let fixture: ComponentFixture<ConceptosAjustesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptosAjustesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptosAjustesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
