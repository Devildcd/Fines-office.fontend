import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionLaboralShowComponent } from './situacion-laboral-show.component';

describe('SituacionLaboralShowComponent', () => {
  let component: SituacionLaboralShowComponent;
  let fixture: ComponentFixture<SituacionLaboralShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituacionLaboralShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituacionLaboralShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
