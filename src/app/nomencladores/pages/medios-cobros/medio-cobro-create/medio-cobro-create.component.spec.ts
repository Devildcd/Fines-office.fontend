import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedioCobroCreateComponent } from './medio-cobro-create.component';

describe('MedioCobroCreateComponent', () => {
  let component: MedioCobroCreateComponent;
  let fixture: ComponentFixture<MedioCobroCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedioCobroCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedioCobroCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
