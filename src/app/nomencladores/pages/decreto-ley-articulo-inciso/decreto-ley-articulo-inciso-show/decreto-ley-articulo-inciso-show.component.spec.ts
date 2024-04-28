import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecretoLeyArticuloIncisoShowComponent } from './decreto-ley-articulo-inciso-show.component';

describe('DecretoLeyArticuloIncisoShowComponent', () => {
  let component: DecretoLeyArticuloIncisoShowComponent;
  let fixture: ComponentFixture<DecretoLeyArticuloIncisoShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecretoLeyArticuloIncisoShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecretoLeyArticuloIncisoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
