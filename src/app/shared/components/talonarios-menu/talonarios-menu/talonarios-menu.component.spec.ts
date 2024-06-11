import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TalonariosMenuComponent } from './talonarios-menu.component';

describe('TalonariosMenuComponent', () => {
  let component: TalonariosMenuComponent;
  let fixture: ComponentFixture<TalonariosMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalonariosMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalonariosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
