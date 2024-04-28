import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMultaShowComponent } from './tipo-multa-show.component';

describe('TipoMultaShowComponent', () => {
  let component: TipoMultaShowComponent;
  let fixture: ComponentFixture<TipoMultaShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoMultaShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoMultaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
