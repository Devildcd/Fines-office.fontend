import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAjusteEditComponent } from './tipo-ajuste-edit.component';

describe('TipoAjusteEditComponent', () => {
  let component: TipoAjusteEditComponent;
  let fixture: ComponentFixture<TipoAjusteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAjusteEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoAjusteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
