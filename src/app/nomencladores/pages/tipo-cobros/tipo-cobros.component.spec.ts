import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCobrosComponent } from './tipo-cobros.component';

describe('TipoCobrosComponent', () => {
  let component: TipoCobrosComponent;
  let fixture: ComponentFixture<TipoCobrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCobrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
