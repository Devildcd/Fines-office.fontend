import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonedaShowComponent } from './moneda-show.component';

describe('MonedaShowComponent', () => {
  let component: MonedaShowComponent;
  let fixture: ComponentFixture<MonedaShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonedaShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonedaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
