import { TestBed } from '@angular/core/testing';

import { SubMovMultaService } from './sub-mov-multa.service';

describe('SubMovMultaService', () => {
  let service: SubMovMultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubMovMultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
