import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxMinCantidadEditComponent } from './max-min-cantidad-edit.component';

describe('MaxMinCantidadEditComponent', () => {
  let component: MaxMinCantidadEditComponent;
  let fixture: ComponentFixture<MaxMinCantidadEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxMinCantidadEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxMinCantidadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
