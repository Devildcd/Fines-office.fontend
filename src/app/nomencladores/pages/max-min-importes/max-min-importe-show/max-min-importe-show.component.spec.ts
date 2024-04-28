import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxMinImporteShowComponent } from './max-min-importe-show.component';

describe('MaxMinImporteShowComponent', () => {
  let component: MaxMinImporteShowComponent;
  let fixture: ComponentFixture<MaxMinImporteShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxMinImporteShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxMinImporteShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
