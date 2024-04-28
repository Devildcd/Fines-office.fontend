import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejoPopularCreateComponent } from './consejo-popular-create.component';

describe('ConsejoPopularCreateComponent', () => {
  let component: ConsejoPopularCreateComponent;
  let fixture: ComponentFixture<ConsejoPopularCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsejoPopularCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsejoPopularCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
