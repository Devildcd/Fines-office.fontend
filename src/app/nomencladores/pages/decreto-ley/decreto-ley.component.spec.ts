import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecretoLeyComponent } from './decreto-ley.component';

describe('DecretoLeyComponent', () => {
  let component: DecretoLeyComponent;
  let fixture: ComponentFixture<DecretoLeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecretoLeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecretoLeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
