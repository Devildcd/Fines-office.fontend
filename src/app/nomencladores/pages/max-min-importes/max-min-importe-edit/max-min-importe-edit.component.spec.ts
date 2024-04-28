import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxMinImporteEditComponent } from './max-min-importe-edit.component';

describe('MaxMinImporteEditComponent', () => {
  let component: MaxMinImporteEditComponent;
  let fixture: ComponentFixture<MaxMinImporteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxMinImporteEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxMinImporteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
