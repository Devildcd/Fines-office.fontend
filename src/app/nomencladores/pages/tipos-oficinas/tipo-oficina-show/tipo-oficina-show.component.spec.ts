import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoOficinaShowComponent } from './tipo-oficina-show.component';

describe('TipoOficinaShowComponent', () => {
  let component: TipoOficinaShowComponent;
  let fixture: ComponentFixture<TipoOficinaShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoOficinaShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoOficinaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
