import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionesLaboralesComponent } from './situaciones-laborales.component';

describe('SituacionesLaboralesComponent', () => {
  let component: SituacionesLaboralesComponent;
  let fixture: ComponentFixture<SituacionesLaboralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituacionesLaboralesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituacionesLaboralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
