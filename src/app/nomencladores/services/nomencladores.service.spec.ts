import { TestBed } from '@angular/core/testing';

import { NomencladoresService } from './nomencladores.service';

describe('NomencladoresService', () => {
  let service: NomencladoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomencladoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
