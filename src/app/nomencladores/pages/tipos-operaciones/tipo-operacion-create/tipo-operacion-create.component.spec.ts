import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoOperacionCreateComponent } from './tipo-operacion-create.component';

describe('TipoOperacionCreateComponent', () => {
  let component: TipoOperacionCreateComponent;
  let fixture: ComponentFixture<TipoOperacionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoOperacionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoOperacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
