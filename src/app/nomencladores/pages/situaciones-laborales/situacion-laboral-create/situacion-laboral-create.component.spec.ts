import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionLaboralCreateComponent } from './situacion-laboral-create.component';

describe('SituacionLaboralCreateComponent', () => {
  let component: SituacionLaboralCreateComponent;
  let fixture: ComponentFixture<SituacionLaboralCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituacionLaboralCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituacionLaboralCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
