import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoOficinaCreateComponent } from './tipo-oficina-create.component';

describe('TipoOficinaCreateComponent', () => {
  let component: TipoOficinaCreateComponent;
  let fixture: ComponentFixture<TipoOficinaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoOficinaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoOficinaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
