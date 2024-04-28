import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaPeligrosidadEditComponent } from './categoria-peligrosidad-edit.component';

describe('CategoriaPeligrosidadEditComponent', () => {
  let component: CategoriaPeligrosidadEditComponent;
  let fixture: ComponentFixture<CategoriaPeligrosidadEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaPeligrosidadEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaPeligrosidadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
