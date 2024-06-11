import { TestBed } from '@angular/core/testing';

import { ContraventorService } from './contraventor.service';

describe('ContraventorService', () => {
  let service: ContraventorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContraventorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
