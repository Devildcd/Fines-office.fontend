import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxMinImportesComponent } from './max-min-importes.component';

describe('MaxMinImportesComponent', () => {
  let component: MaxMinImportesComponent;
  let fixture: ComponentFixture<MaxMinImportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxMinImportesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxMinImportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
