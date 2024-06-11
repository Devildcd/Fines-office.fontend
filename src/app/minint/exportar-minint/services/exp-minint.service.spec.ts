import { TestBed } from '@angular/core/testing';

import { ExpMinintService } from './exp-minint.service';

describe('ExpMinintService', () => {
  let service: ExpMinintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpMinintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
