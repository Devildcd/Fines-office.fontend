import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionMenuComponent } from './recepcion-menu.component';

describe('RecepcionMenuComponent', () => {
  let component: RecepcionMenuComponent;
  let fixture: ComponentFixture<RecepcionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepcionMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
