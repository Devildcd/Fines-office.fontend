import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalleShowComponent } from './calle-show.component';

describe('CalleShowComponent', () => {
  let component: CalleShowComponent;
  let fixture: ComponentFixture<CalleShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalleShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalleShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
