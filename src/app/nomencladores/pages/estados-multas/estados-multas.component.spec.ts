import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosMultasComponent } from './estados-multas.component';

describe('EstadosMultasComponent', () => {
  let component: EstadosMultasComponent;
  let fixture: ComponentFixture<EstadosMultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadosMultasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosMultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
