import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoMultaCreateComponent } from './estado-multa-create.component';

describe('EstadoMultaCreateComponent', () => {
  let component: EstadoMultaCreateComponent;
  let fixture: ComponentFixture<EstadoMultaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoMultaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoMultaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
