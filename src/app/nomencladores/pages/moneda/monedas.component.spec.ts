import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonedasComponent } from './monedas.component';

describe('MonedaComponent', () => {
  let component: MonedasComponent;
  let fixture: ComponentFixture<MonedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonedasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
