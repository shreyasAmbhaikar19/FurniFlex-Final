import { TestBed } from '@angular/core/testing';

import { AuthDashboardService } from './auth-dashboard.service';

describe('AuthDashboardService', () => {
  let service: AuthDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
