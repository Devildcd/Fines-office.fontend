import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejoPopularEditComponent } from './consejo-popular-edit.component';

describe('ConsejoPopularEditComponent', () => {
  let component: ConsejoPopularEditComponent;
  let fixture: ComponentFixture<ConsejoPopularEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsejoPopularEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsejoPopularEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
