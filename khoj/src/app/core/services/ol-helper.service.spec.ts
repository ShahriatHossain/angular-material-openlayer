import { TestBed } from '@angular/core/testing';

import { OlHelperService } from './ol-helper.service';

describe('OlHelperService', () => {
  let service: OlHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
