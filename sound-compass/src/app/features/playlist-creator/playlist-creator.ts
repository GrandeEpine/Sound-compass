import { Component, inject, signal } from '@angular/core';
import { QueryParametersService } from '../../core/services/query-parameters-service/query-parameters-service';
import { PlaylistChoice } from './playlist-choice/playlist-choice';

@Component({
  selector: 'app-playlist-creator',
  imports: [PlaylistChoice],
  templateUrl: './playlist-creator.html',
  styleUrl: './playlist-creator.css',
})
export class PlaylistCreator {
  private queryParametersService = inject(QueryParametersService);
  protected currentStep = signal<1 | 2 | 3 | 4>(1);
  protected playlistId = signal<string | null>(null);

  onInputDone(playlistId: string) {
    this.playlistId.set(playlistId);
    this.currentStep.set(2);
  }

  protected readonly confirm = confirm;
}
