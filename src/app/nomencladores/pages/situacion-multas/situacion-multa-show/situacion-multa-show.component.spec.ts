import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionMultaShowComponent } from './situacion-multa-show.component';

describe('SituacionMultaShowComponent', () => {
  let component: SituacionMultaShowComponent;
  let fixture: ComponentFixture<SituacionMultaShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituacionMultaShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituacionMultaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
