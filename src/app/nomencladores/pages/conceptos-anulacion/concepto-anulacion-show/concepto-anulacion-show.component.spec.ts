import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoAnulacionShowComponent } from './concepto-anulacion-show.component';

describe('ConceptoAnulacionShowComponent', () => {
  let component: ConceptoAnulacionShowComponent;
  let fixture: ComponentFixture<ConceptoAnulacionShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoAnulacionShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoAnulacionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
