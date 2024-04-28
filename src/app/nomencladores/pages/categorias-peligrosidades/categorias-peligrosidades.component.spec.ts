import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasPeligrosidadesComponent } from './categorias-peligrosidades.component';

describe('CategoriasPeligrosidadesComponent', () => {
  let component: CategoriasPeligrosidadesComponent;
  let fixture: ComponentFixture<CategoriasPeligrosidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasPeligrosidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasPeligrosidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
