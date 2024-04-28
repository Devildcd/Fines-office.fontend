import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendariosCreateComponent } from './calendarios-create.component';

describe('CalendariosCreateComponent', () => {
  let component: CalendariosCreateComponent;
  let fixture: ComponentFixture<CalendariosCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendariosCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendariosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
