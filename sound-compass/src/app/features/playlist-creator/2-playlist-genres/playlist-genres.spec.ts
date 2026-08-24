import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistGenres } from './playlist-genres';

describe('PlaylistGenres', () => {
  let component: PlaylistGenres;
  let fixture: ComponentFixture<PlaylistGenres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistGenres],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistGenres);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
