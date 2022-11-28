import { TestBed } from '@angular/core/testing';

import { Api11natorService } from './api11nator.service';

describe('Api11natorService', () => {
  let service: Api11natorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Api11natorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
