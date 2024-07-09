import { TestBed } from '@angular/core/testing';

import { AjustarService } from './ajustar.service';

describe('AjustarService', () => {
  let service: AjustarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjustarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
