import { TestBed } from '@angular/core/testing';

import { OlApiService } from './ol-api.service';

describe('OlApiService', () => {
  let service: OlApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
