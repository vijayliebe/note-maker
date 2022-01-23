import { TestBed } from '@angular/core/testing';

import { CommonNotificationService } from './common-notification.service';

describe('CommonErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonNotificationService = TestBed.get(CommonNotificationService);
    expect(service).toBeTruthy();
  });
});
