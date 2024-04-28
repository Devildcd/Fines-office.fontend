import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncisoShowComponent } from './inciso-show.component';

describe('IncisoShowComponent', () => {
  let component: IncisoShowComponent;
  let fixture: ComponentFixture<IncisoShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncisoShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncisoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
