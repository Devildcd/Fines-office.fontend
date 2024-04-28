import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritoCreateComponent } from './distrito-create.component';

describe('DistritoCreateComponent', () => {
  let component: DistritoCreateComponent;
  let fixture: ComponentFixture<DistritoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistritoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistritoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
