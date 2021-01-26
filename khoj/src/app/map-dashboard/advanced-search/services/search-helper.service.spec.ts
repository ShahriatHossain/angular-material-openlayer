import { TestBed } from '@angular/core/testing';

import { SearchHelperService } from './search-helper.service';

describe('SearchHelperService', () => {
  let service: SearchHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
