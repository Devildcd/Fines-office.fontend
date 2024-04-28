import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxMinCantidadComponent } from './max-min-cantidad.component';

describe('MaxMinCantidadComponent', () => {
  let component: MaxMinCantidadComponent;
  let fixture: ComponentFixture<MaxMinCantidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxMinCantidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxMinCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
