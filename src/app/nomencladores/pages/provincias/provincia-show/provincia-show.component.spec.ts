import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinciaShowComponent } from './provincia-show.component';

describe('ProvinciaShowComponent', () => {
  let component: ProvinciaShowComponent;
  let fixture: ComponentFixture<ProvinciaShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinciaShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvinciaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
