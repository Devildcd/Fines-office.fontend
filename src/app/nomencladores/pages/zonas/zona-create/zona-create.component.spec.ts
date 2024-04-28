import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaCreateComponent } from './zona-create.component';

describe('ZonaCreateComponent', () => {
  let component: ZonaCreateComponent;
  let fixture: ComponentFixture<ZonaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
