import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejosPopularesComponent } from './consejos-populares.component';

describe('ConsejosPopularesComponent', () => {
  let component: ConsejosPopularesComponent;
  let fixture: ComponentFixture<ConsejosPopularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsejosPopularesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsejosPopularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
