import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccmShowComponent } from './occm-show.component';

describe('OccmShowComponent', () => {
  let component: OccmShowComponent;
  let fixture: ComponentFixture<OccmShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccmShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccmShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
