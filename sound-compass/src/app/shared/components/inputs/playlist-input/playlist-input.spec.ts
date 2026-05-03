import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistInput } from './playlist-input';

describe('PlaylistInput', () => {
  let component: PlaylistInput;
  let fixture: ComponentFixture<PlaylistInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistInput],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
