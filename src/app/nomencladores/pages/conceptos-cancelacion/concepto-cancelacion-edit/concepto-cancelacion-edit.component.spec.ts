import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoCancelacionEditComponent } from './concepto-cancelacion-edit.component';

describe('ConceptoCancelacionEditComponent', () => {
  let component: ConceptoCancelacionEditComponent;
  let fixture: ComponentFixture<ConceptoCancelacionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoCancelacionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoCancelacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
