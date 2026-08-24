import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistChoice } from './playlist-choice';

describe('PlaylistChoice', () => {
  let component: PlaylistChoice;
  let fixture: ComponentFixture<PlaylistChoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistChoice],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistChoice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
