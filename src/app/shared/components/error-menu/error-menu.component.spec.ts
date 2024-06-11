import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMenuComponent } from './error-menu.component';

describe('ErrorMenuComponent', () => {
  let component: ErrorMenuComponent;
  let fixture: ComponentFixture<ErrorMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
