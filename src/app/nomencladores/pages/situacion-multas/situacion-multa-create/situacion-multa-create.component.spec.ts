import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionMultaCreateComponent } from './situacion-multa-create.component';

describe('SituacionMultaCreateComponent', () => {
  let component: SituacionMultaCreateComponent;
  let fixture: ComponentFixture<SituacionMultaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituacionMultaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituacionMultaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
