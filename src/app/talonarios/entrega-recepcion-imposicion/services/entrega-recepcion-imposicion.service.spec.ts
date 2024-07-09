import { TestBed } from '@angular/core/testing';

import { EntregaRecepcionImposicionService } from './entrega-recepcion-imposicion.service';

describe('EntregaRecepcionImposicionService', () => {
  let service: EntregaRecepcionImposicionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntregaRecepcionImposicionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
