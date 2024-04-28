import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionMultaEditComponent } from './situacion-multa-edit.component';

describe('SituacionMultaEditComponent', () => {
  let component: SituacionMultaEditComponent;
  let fixture: ComponentFixture<SituacionMultaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituacionMultaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituacionMultaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
