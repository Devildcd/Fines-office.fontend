import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxMinImportesCreateComponent } from './max-min-importes-create.component';

describe('MaxMinImportesCreateComponent', () => {
  let component: MaxMinImportesCreateComponent;
  let fixture: ComponentFixture<MaxMinImportesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxMinImportesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxMinImportesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
