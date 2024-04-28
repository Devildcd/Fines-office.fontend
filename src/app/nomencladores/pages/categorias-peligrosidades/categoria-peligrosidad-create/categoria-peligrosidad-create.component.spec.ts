import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaPeligrosidadCreateComponent } from './categoria-peligrosidad-create.component';

describe('CategoriaPeligrosidadCreateComponent', () => {
  let component: CategoriaPeligrosidadCreateComponent;
  let fixture: ComponentFixture<CategoriaPeligrosidadCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaPeligrosidadCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaPeligrosidadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
