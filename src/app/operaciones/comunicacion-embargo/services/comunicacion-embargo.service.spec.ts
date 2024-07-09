import { TestBed } from '@angular/core/testing';

import { ComunicacionEmbargoService } from './comunicacion-embargo.service';

describe('ComunicacionEmbargoService', () => {
  let service: ComunicacionEmbargoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicacionEmbargoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
