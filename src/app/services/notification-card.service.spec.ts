import { TestBed } from '@angular/core/testing';

import { NotificationCard } from './notification-card.service';

describe('NotificationService', () => {
  let service: NotificationCard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationCard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
