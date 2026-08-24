import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCustomize } from './playlist-customize';

describe('PlaylistCustomize', () => {
  let component: PlaylistCustomize;
  let fixture: ComponentFixture<PlaylistCustomize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistCustomize],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistCustomize);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
