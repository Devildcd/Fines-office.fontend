import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionMultasComponent } from './situacion-multas.component';

describe('SituacionMultasComponent', () => {
  let component: SituacionMultasComponent;
  let fixture: ComponentFixture<SituacionMultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituacionMultasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituacionMultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
