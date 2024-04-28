import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccmComponent } from './occm.component';

describe('OccmComponent', () => {
  let component: OccmComponent;
  let fixture: ComponentFixture<OccmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
