import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendariosShowComponent } from './calendarios-show.component';

describe('CalendariosShowComponent', () => {
  let component: CalendariosShowComponent;
  let fixture: ComponentFixture<CalendariosShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendariosShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendariosShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
