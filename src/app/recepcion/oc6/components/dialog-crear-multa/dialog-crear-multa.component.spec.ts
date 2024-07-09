import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrearMultaComponent } from './dialog-crear-multa.component';

describe('DialogCrearMultaComponent', () => {
  let component: DialogCrearMultaComponent;
  let fixture: ComponentFixture<DialogCrearMultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCrearMultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCrearMultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
