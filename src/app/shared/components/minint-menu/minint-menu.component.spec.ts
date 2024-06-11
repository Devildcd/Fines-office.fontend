import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinintMenuComponent } from './minint-menu.component';

describe('MinintMenuComponent', () => {
  let component: MinintMenuComponent;
  let fixture: ComponentFixture<MinintMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinintMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinintMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
