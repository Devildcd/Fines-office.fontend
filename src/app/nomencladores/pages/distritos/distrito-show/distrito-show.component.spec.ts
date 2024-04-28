import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritoShowComponent } from './distrito-show.component';

describe('DistritoShowComponent', () => {
  let component: DistritoShowComponent;
  let fixture: ComponentFixture<DistritoShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistritoShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistritoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
