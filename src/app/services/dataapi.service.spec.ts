import { TestBed } from '@angular/core/testing';

import { DataapiService } from './dataapi.service';

describe('DataapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataapiService = TestBed.get(DataapiService);
    expect(service).toBeTruthy();
  });
});
