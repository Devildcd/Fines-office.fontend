import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccmEditComponent } from './occm-edit.component';

describe('OccmEditComponent', () => {
  let component: OccmEditComponent;
  let fixture: ComponentFixture<OccmEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccmEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccmEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
