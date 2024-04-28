import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionLaboralEditComponent } from './situacion-laboral-edit.component';

describe('SituacionLaboralEditComponent', () => {
  let component: SituacionLaboralEditComponent;
  let fixture: ComponentFixture<SituacionLaboralEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituacionLaboralEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituacionLaboralEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
