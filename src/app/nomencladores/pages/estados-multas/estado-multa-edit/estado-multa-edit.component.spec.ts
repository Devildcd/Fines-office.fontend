import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoMultaEditComponent } from './estado-multa-edit.component';

describe('EstadoMultaEditComponent', () => {
  let component: EstadoMultaEditComponent;
  let fixture: ComponentFixture<EstadoMultaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoMultaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoMultaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
