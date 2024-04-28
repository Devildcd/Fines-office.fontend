import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendariosEditComponent } from './calendarios-edit.component';

describe('CalendariosEditComponent', () => {
  let component: CalendariosEditComponent;
  let fixture: ComponentFixture<CalendariosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendariosEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendariosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
