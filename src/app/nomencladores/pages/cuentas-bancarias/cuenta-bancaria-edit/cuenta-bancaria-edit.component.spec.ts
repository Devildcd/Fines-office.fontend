import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaBancariaEditComponent } from './cuenta-bancaria-edit.component';

describe('CuentaBancariaEditComponent', () => {
  let component: CuentaBancariaEditComponent;
  let fixture: ComponentFixture<CuentaBancariaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaBancariaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentaBancariaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
