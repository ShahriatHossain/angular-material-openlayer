import { TestBed } from '@angular/core/testing';

import { SiteConditionsService } from './site-conditions.service';

describe('SiteConditionsService', () => {
  let service: SiteConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
