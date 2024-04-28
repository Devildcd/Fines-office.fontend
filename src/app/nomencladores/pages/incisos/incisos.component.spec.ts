import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncisosComponent } from './incisos.component';

describe('IncisosComponent', () => {
  let component: IncisosComponent;
  let fixture: ComponentFixture<IncisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncisosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
