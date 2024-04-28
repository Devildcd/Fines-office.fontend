import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoCancelacionCreateComponent } from './concepto-cancelacion-create.component';

describe('ConceptoCancelacionCreateComponent', () => {
  let component: ConceptoCancelacionCreateComponent;
  let fixture: ComponentFixture<ConceptoCancelacionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoCancelacionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoCancelacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
