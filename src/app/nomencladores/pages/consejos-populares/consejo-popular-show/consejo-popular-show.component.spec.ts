import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejoPopularShowComponent } from './consejo-popular-show.component';

describe('ConsejoPopularShowComponent', () => {
  let component: ConsejoPopularShowComponent;
  let fixture: ComponentFixture<ConsejoPopularShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsejoPopularShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsejoPopularShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
