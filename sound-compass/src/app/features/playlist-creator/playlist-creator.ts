import { Component, signal } from '@angular/core';
import { PlaylistChoice } from './playlist-choice/playlist-choice';
import { PlaylistGenres } from './playlist-genres/playlist-genres';
import { Genre } from '../../core/models/genre';

@Component({
  selector: 'app-playlist-creator',
  imports: [PlaylistChoice, PlaylistGenres],
  templateUrl: './playlist-creator.html',
  styleUrl: './playlist-creator.css',
})
export class PlaylistCreator {
  protected currentStep = signal<1 | 2 | 3 | 4>(1);
  public playlistId = signal<string | null>(null);
  protected selectedGenres = signal<Set<Genre>>(new Set());

  protected confirmStep1(playlistId: string): void {
    this.playlistId.set(playlistId);
    this.currentStep.set(2);
  }

  protected confirmStep2(genres: Set<Genre>): void {
    this.selectedGenres.set(genres);
    this.currentStep.set(3);
  }
}
