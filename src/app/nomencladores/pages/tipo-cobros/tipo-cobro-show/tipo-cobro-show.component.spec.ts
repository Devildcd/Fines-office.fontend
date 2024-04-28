import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCobroShowComponent } from './tipo-cobro-show.component';

describe('TipoCobroShowComponent', () => {
  let component: TipoCobroShowComponent;
  let fixture: ComponentFixture<TipoCobroShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCobroShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoCobroShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
