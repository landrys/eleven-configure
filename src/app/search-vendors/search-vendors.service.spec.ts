import { TestBed } from '@angular/core/testing';

import { SearchVendorsService } from './search-vendors.service';

describe('SearchVendorsService', () => {
  let service: SearchVendorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchVendorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
