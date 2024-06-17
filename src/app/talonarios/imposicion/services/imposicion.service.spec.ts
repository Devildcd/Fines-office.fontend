import { TestBed } from '@angular/core/testing';

import { ImposicionService } from './imposicion.service';

describe('ImposicionService', () => {
  let service: ImposicionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImposicionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
