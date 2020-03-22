import { TestBed } from '@angular/core/testing';

import { SwipeAngularListService } from './swipe-angular-list.service';

describe('SwipeAngularListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwipeAngularListService = TestBed.get(SwipeAngularListService);
    expect(service).toBeTruthy();
  });
});
