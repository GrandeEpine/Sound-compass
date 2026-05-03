import { Component, inject, output, signal } from '@angular/core';
import { PlaylistInput } from '../../../shared/components/inputs/playlist-input/playlist-input';
import { PlaylistCard } from '../../../shared/components/cards/playlist-card/playlist-card';
import { PlaylistServices } from '../../../core/services/playlist-services/playlistServices';
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { Loading } from '../../../shared/components/loading/loading';
import { ValidateButton } from '../../../shared/components/buttons/validate-button/validate-button';

@Component({
  selector: 'app-playlist-choice',
  imports: [PlaylistInput, PlaylistCard, Loading, ValidateButton],
  templateUrl: './playlist-choice.html',
  styleUrl: './playlist-choice.css',
})
export class PlaylistChoice {
  private playlistService = inject(PlaylistServices);

  public playlist = signal<SimplifiedPlaylist | null>(null);
  protected isLoading = signal<boolean>(false);
  protected error = signal<string | null>(null);

  protected next = output<string>();

  async onPlaylistIdReceived(id: string) {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const playlist = await this.playlistService.getPlaylistById(id);
      this.playlist.set(playlist);
    } catch {
      this.error.set('Impossible to get the playlist');
    } finally {
      this.isLoading.set(false);
    }
  }
  confirm() {
    const playlist = this.playlist();
    if (!playlist) return;
    this.next.emit(playlist.id);
  }
}
