import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptosAnulacionComponent } from './conceptos-anulacion.component';

describe('ConceptosAnulacionComponent', () => {
  let component: ConceptosAnulacionComponent;
  let fixture: ComponentFixture<ConceptosAnulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptosAnulacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptosAnulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
