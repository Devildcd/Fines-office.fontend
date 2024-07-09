import { TestBed } from '@angular/core/testing';

import { DuplicarService } from './duplicar.service';

describe('DuplicarService', () => {
  let service: DuplicarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuplicarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
