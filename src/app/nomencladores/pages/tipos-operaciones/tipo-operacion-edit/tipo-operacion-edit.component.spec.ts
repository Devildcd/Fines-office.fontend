import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoOperacionEditComponent } from './tipo-operacion-edit.component';

describe('TipoOperacionEditComponent', () => {
  let component: TipoOperacionEditComponent;
  let fixture: ComponentFixture<TipoOperacionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoOperacionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoOperacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
