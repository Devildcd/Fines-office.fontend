import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMultaCreateComponent } from './tipo-multa-create.component';

describe('TipoMultaCreateComponent', () => {
  let component: TipoMultaCreateComponent;
  let fixture: ComponentFixture<TipoMultaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoMultaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoMultaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
