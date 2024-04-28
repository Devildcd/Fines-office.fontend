import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecretoLeyEditComponent } from './decreto-ley-edit.component';

describe('DecretoLeyEditComponent', () => {
  let component: DecretoLeyEditComponent;
  let fixture: ComponentFixture<DecretoLeyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecretoLeyEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecretoLeyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
