import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecretoLeyCreateComponent } from './decreto-ley-create.component';

describe('DecretoLeyCreateComponent', () => {
  let component: DecretoLeyCreateComponent;
  let fixture: ComponentFixture<DecretoLeyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecretoLeyCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecretoLeyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
