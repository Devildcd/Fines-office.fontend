import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaBancariaShowComponent } from './cuenta-bancaria-show.component';

describe('CuentaBancariaShowComponent', () => {
  let component: CuentaBancariaShowComponent;
  let fixture: ComponentFixture<CuentaBancariaShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaBancariaShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentaBancariaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
