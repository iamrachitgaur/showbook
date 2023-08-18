import { TestBed } from '@angular/core/testing';

import { NoauthGuardGuard } from './noauth-guard.guard';

describe('NoauthGuardGuard', () => {
  let guard: NoauthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoauthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
