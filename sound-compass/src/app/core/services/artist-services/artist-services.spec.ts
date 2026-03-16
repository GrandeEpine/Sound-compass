import { TestBed } from '@angular/core/testing';

import { ArtistServices } from './artist-services';

describe('ArtistServices', () => {
  let service: ArtistServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
