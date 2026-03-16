import { TestBed } from '@angular/core/testing';

import { GenreServices } from './genre-services';

describe('GenreServices', () => {
  let service: GenreServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
