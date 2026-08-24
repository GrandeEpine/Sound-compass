import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistGenresSearch } from './playlist-genres-search';

describe('PlaylistGenresSearch', () => {
  let component: PlaylistGenresSearch;
  let fixture: ComponentFixture<PlaylistGenresSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistGenresSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistGenresSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
