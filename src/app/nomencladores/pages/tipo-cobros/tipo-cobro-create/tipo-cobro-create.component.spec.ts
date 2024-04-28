import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCobroCreateComponent } from './tipo-cobro-create.component';

describe('TipoCobroCreateComponent', () => {
  let component: TipoCobroCreateComponent;
  let fixture: ComponentFixture<TipoCobroCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCobroCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoCobroCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
