import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAjusteCreateComponent } from './tipo-ajuste-create.component';

describe('TipoAjusteCreateComponent', () => {
  let component: TipoAjusteCreateComponent;
  let fixture: ComponentFixture<TipoAjusteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAjusteCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoAjusteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
