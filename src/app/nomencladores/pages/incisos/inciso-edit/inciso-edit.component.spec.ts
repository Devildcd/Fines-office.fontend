import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncisoEditComponent } from './inciso-edit.component';

describe('IncisoEditComponent', () => {
  let component: IncisoEditComponent;
  let fixture: ComponentFixture<IncisoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncisoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncisoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
