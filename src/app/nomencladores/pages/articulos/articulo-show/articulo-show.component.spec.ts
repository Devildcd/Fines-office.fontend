import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloShowComponent } from './articulo-show.component';

describe('ArticuloShowComponent', () => {
  let component: ArticuloShowComponent;
  let fixture: ComponentFixture<ArticuloShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
