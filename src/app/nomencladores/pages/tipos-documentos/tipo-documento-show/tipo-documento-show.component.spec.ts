import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDocumentoShowComponent } from './tipo-documento-show.component';

describe('TipoDocumentoShowComponent', () => {
  let component: TipoDocumentoShowComponent;
  let fixture: ComponentFixture<TipoDocumentoShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoDocumentoShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoDocumentoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
