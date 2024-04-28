import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalleCreateComponent } from './calle-create.component';

describe('CalleCreateComponent', () => {
  let component: CalleCreateComponent;
  let fixture: ComponentFixture<CalleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalleCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
