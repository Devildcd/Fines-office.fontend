import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCobroEditComponent } from './tipo-cobro-edit.component';

describe('TipoCobroEditComponent', () => {
  let component: TipoCobroEditComponent;
  let fixture: ComponentFixture<TipoCobroEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCobroEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoCobroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
