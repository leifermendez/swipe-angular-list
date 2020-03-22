import { TestBed } from '@angular/core/testing';

import { SwipeServiceService } from './swipe-service.service';

describe('SwipeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwipeServiceService = TestBed.get(SwipeServiceService);
    expect(service).toBeTruthy();
  });
});
