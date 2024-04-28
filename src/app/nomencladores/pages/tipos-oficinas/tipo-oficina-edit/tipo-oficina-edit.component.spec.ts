import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoOficinaEditComponent } from './tipo-oficina-edit.component';

describe('TipoOficinaEditComponent', () => {
  let component: TipoOficinaEditComponent;
  let fixture: ComponentFixture<TipoOficinaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoOficinaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoOficinaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
