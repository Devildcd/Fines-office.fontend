import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinciaCreateComponent } from './provincia-create.component';

describe('ProvinciaCreateComponent', () => {
  let component: ProvinciaCreateComponent;
  let fixture: ComponentFixture<ProvinciaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinciaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvinciaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
