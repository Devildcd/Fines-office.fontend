import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonedaEditComponent } from './moneda-edit.component';

describe('MonedaEditComponent', () => {
  let component: MonedaEditComponent;
  let fixture: ComponentFixture<MonedaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonedaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonedaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
