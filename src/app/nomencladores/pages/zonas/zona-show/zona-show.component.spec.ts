import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaShowComponent } from './zona-show.component';

describe('ZonaShowComponent', () => {
  let component: ZonaShowComponent;
  let fixture: ComponentFixture<ZonaShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonaShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
