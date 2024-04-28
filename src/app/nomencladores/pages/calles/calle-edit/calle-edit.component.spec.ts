import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalleEditComponent } from './calle-edit.component';

describe('CalleEditComponent', () => {
  let component: CalleEditComponent;
  let fixture: ComponentFixture<CalleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalleEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
