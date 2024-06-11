import { TestBed } from '@angular/core/testing';

import { Oc37Service } from './oc37.service';

describe('Oc37Service', () => {
  let service: Oc37Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Oc37Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
