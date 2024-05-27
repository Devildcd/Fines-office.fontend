import { TestBed } from '@angular/core/testing';

import { Oc5Service } from './oc5.service';

describe('Oc5Service', () => {
  let service: Oc5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Oc5Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
