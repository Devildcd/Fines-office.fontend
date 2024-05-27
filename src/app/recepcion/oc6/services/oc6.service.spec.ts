import { TestBed } from '@angular/core/testing';

import { Oc6Service } from './oc6.service';

describe('Oc6Service', () => {
  let service: Oc6Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Oc6Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
