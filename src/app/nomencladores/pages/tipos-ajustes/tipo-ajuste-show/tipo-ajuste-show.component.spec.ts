import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAjusteShowComponent } from './tipo-ajuste-show.component';

describe('TipoAjusteShowComponent', () => {
  let component: TipoAjusteShowComponent;
  let fixture: ComponentFixture<TipoAjusteShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAjusteShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoAjusteShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
