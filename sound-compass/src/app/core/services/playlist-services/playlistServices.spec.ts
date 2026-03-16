import { TestBed } from '@angular/core/testing';

import { PlaylistServices } from './playlistServices';

describe('PlaylistServices', () => {
  let service: PlaylistServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
