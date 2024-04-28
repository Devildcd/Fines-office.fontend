import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncisoCreateComponent } from './inciso-create.component';

describe('IncisoCreateComponent', () => {
  let component: IncisoCreateComponent;
  let fixture: ComponentFixture<IncisoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncisoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncisoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
