import { TestBed } from '@angular/core/testing';

import { Oc40Service } from './oc40.service';

describe('Oc40Service', () => {
  let service: Oc40Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Oc40Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
