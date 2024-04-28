import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxMinCantidadCreateComponent } from './max-min-cantidad-create.component';

describe('MaxMinCantidadCreateComponent', () => {
  let component: MaxMinCantidadCreateComponent;
  let fixture: ComponentFixture<MaxMinCantidadCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxMinCantidadCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxMinCantidadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
