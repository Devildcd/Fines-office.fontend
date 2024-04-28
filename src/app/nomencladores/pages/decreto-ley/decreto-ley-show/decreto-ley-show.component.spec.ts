import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecretoLeyShowComponent } from './decreto-ley-show.component';

describe('DecretoLeyShowComponent', () => {
  let component: DecretoLeyShowComponent;
  let fixture: ComponentFixture<DecretoLeyShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecretoLeyShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecretoLeyShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
