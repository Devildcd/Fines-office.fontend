import { TestBed } from '@angular/core/testing';

import { EntregaRecepcionComprobanteService } from './entrega-recepcion-cmprobante.service';

describe('EntregaRecepcionCmprobanteService', () => {
  let service: EntregaRecepcionComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntregaRecepcionComprobanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
