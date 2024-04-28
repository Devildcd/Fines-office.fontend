import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaPeligrosidadShowComponent } from './categoria-peligrosidad-show.component';

describe('CategoriaPeligrosidadShowComponent', () => {
  let component: CategoriaPeligrosidadShowComponent;
  let fixture: ComponentFixture<CategoriaPeligrosidadShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaPeligrosidadShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaPeligrosidadShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
