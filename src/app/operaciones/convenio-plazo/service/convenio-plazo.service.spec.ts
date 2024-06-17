import { TestBed } from '@angular/core/testing';

import { ConvenioPlazoService } from './convenio-plazo.service';

describe('ConvenioPlazoService', () => {
  let service: ConvenioPlazoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvenioPlazoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
