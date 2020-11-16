import { TestBed } from '@angular/core/testing';

import { BookstoreService } from './bookstore.service';

describe('BookstoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookstoreService = TestBed.get(BookstoreService);
    expect(service).toBeTruthy();
  });
});
