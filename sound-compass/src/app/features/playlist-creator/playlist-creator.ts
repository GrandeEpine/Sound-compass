import {Component, signal, WritableSignal} from '@angular/core';
import { PlaylistChoice } from './1-playlist-choice/playlist-choice';
import { PlaylistGenres } from './2-playlist-genres/playlist-genres';
import { Genre } from '../../core/models/genre';
import {PlaylistCustomize} from './3-playlist-customize/playlist-customize';
import {PlaylistCustomization} from '../../core/models/playlist-customization';
import {PlaylistDone} from './4-playlist-done/playlist-done';

@Component({
  selector: 'app-playlist-creator',
  imports: [PlaylistChoice, PlaylistGenres, PlaylistCustomize, PlaylistDone],
  templateUrl: './playlist-creator.html',
  styleUrl: './playlist-creator.css',
})
export class PlaylistCreator {
  protected currentStep = signal<1 | 2 | 3 | 4>(1);
  public playlistId = signal<string | null>(null);
  protected selectedGenres = signal<Set<Genre>>(new Set());
  protected playlistInfos: WritableSignal<PlaylistCustomization | null> = signal<PlaylistCustomization | null>(null);

  protected confirmStep1(playlistId: string): void {
    this.playlistId.set(playlistId);
    this.currentStep.set(2);
  }

  protected confirmStep2(genres: Set<Genre>): void {
    this.selectedGenres.set(genres);
    this.currentStep.set(3);
    console.log(genres);
    console.log(this.currentStep());
  }

  protected confirmStep3(playlistInfo: PlaylistCustomization): void {
    this.playlistInfos.set(playlistInfo);
    console.log(playlistInfo);
    this.currentStep.set(4);
  }
}
