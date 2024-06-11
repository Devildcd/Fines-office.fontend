import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobroMenuComponent } from './cobro-menu.component';

describe('CobroMenuComponent', () => {
  let component: CobroMenuComponent;
  let fixture: ComponentFixture<CobroMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobroMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobroMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
