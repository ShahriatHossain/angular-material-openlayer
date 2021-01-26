import { TestBed } from '@angular/core/testing';

import { BingApiLoaderService } from './bing-api-loader.service';

describe('BingApiLoaderService', () => {
  let service: BingApiLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingApiLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
