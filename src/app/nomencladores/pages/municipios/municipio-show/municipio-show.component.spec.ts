import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioShowComponent } from './municipio-show.component';

describe('MunicipioShowComponent', () => {
  let component: MunicipioShowComponent;
  let fixture: ComponentFixture<MunicipioShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipioShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MunicipioShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
