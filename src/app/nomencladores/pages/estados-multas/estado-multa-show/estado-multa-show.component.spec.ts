import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoMultaShowComponent } from './estado-multa-show.component';

describe('EstadoMultaShowComponent', () => {
  let component: EstadoMultaShowComponent;
  let fixture: ComponentFixture<EstadoMultaShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoMultaShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoMultaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
