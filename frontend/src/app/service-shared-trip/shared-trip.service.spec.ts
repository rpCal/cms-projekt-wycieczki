import { TestBed } from '@angular/core/testing';

import { SharedTripService } from './shared-trip.service';

describe('SharedTripService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedTripService = TestBed.get(SharedTripService);
    expect(service).toBeTruthy();
  });
});
