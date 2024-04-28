import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMultaEditComponent } from './tipo-multa-edit.component';

describe('TipoMultaEditComponent', () => {
  let component: TipoMultaEditComponent;
  let fixture: ComponentFixture<TipoMultaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoMultaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoMultaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
