import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoCancelacionShowComponent } from './concepto-cancelacion-show.component';

describe('ConceptoCancelacionShowComponent', () => {
  let component: ConceptoCancelacionShowComponent;
  let fixture: ComponentFixture<ConceptoCancelacionShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoCancelacionShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoCancelacionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
