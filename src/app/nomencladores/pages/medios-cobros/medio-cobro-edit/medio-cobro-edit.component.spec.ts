import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedioCobroEditComponent } from './medio-cobro-edit.component';

describe('MedioCobroEditComponent', () => {
  let component: MedioCobroEditComponent;
  let fixture: ComponentFixture<MedioCobroEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedioCobroEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedioCobroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
