import { TestBed } from '@angular/core/testing';

import { EntregaRecepcionService } from './entrega-recepcion.service';

describe('EntregaRecepcionService', () => {
  let service: EntregaRecepcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntregaRecepcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
