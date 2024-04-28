import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccmCreateComponent } from './occm-create.component';

describe('OccmCreateComponent', () => {
  let component: OccmCreateComponent;
  let fixture: ComponentFixture<OccmCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccmCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccmCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
