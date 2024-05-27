import { TestBed } from '@angular/core/testing';

import { ApremiarService } from './apremiar.service';

describe('ApremiarService', () => {
  let service: ApremiarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApremiarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
