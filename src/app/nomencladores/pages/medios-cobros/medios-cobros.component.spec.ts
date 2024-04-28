import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediosCobrosComponent } from './medios-cobros.component';

describe('MediosCobrosComponent', () => {
  let component: MediosCobrosComponent;
  let fixture: ComponentFixture<MediosCobrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediosCobrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediosCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
