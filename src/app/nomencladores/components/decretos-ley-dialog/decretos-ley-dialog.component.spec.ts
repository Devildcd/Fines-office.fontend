import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecretosLeyDialogComponent } from './decretos-ley-dialog.component';

describe('DecretosLeyDialogComponent', () => {
  let component: DecretosLeyDialogComponent;
  let fixture: ComponentFixture<DecretosLeyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecretosLeyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecretosLeyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
