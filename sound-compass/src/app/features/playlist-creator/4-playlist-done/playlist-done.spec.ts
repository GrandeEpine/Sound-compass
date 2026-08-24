import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDone } from './playlist-done';

describe('PlaylistDone', () => {
  let component: PlaylistDone;
  let fixture: ComponentFixture<PlaylistDone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistDone],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistDone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
