import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxMinCantidadShowComponent } from './max-min-cantidad-show.component';

describe('MaxMinCantidadShowComponent', () => {
  let component: MaxMinCantidadShowComponent;
  let fixture: ComponentFixture<MaxMinCantidadShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxMinCantidadShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxMinCantidadShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
