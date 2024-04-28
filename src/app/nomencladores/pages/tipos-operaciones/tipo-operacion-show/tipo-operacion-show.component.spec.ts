import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoOperacionShowComponent } from './tipo-operacion-show.component';

describe('TipoOperacionShowComponent', () => {
  let component: TipoOperacionShowComponent;
  let fixture: ComponentFixture<TipoOperacionShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoOperacionShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoOperacionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
