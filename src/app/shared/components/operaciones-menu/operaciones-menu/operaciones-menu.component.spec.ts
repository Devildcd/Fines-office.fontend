import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesMenuComponent } from './operaciones-menu.component';

describe('OperacionesMenuComponent', () => {
  let component: OperacionesMenuComponent;
  let fixture: ComponentFixture<OperacionesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacionesMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperacionesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
