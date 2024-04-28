import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedioCobroShowComponent } from './medio-cobro-show.component';

describe('MedioCobroShowComponent', () => {
  let component: MedioCobroShowComponent;
  let fixture: ComponentFixture<MedioCobroShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedioCobroShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedioCobroShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
