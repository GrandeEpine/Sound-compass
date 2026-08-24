import { Component, output, signal } from '@angular/core';
import { ValidateButton } from '../../buttons/validate-button/validate-button';

@Component({
  selector: 'app-playlist-input',
  imports: [ValidateButton],
  templateUrl: './playlist-input.html',
  styleUrl: './playlist-input.css',
})
export class PlaylistInput {
  url = signal('');
  error = signal<string | null>(null);
  next = output<string>();
  readonly SPOTIFY_PLAYLIST_REGEX = /^https:\/\/open\.spotify\.com\/playlist\/([a-zA-Z0-9]+)/;

  validate() {
    const match = this.url().match(this.SPOTIFY_PLAYLIST_REGEX);
    if (!match) {
      this.error.set('No valid spotify link. Ex: https://open.spotify.com/playlist/...');
      return;
    }
    this.error.set(null);
    this.next.emit(match[1]);
  }
}

