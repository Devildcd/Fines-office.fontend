import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptosCancelacionComponent } from './conceptos-cancelacion.component';

describe('ConceptosCancelacionComponent', () => {
  let component: ConceptosCancelacionComponent;
  let fixture: ComponentFixture<ConceptosCancelacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptosCancelacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptosCancelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
