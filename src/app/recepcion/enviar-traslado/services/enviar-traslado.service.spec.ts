import { TestBed } from '@angular/core/testing';

import { EnviarTrasladoService } from './enviar-traslado.service';

describe('EnviarTrasladoService', () => {
  let service: EnviarTrasladoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarTrasladoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
