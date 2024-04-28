import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaEditComponent } from './zona-edit.component';

describe('ZonaEditComponent', () => {
  let component: ZonaEditComponent;
  let fixture: ComponentFixture<ZonaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
