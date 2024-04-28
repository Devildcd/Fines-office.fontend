import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposOficinasComponent } from './tipos-oficinas.component';

describe('TiposOficinasComponent', () => {
  let component: TiposOficinasComponent;
  let fixture: ComponentFixture<TiposOficinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposOficinasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposOficinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
