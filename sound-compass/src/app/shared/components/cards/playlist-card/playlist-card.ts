import { Component, input } from '@angular/core';
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import {DecodeHtmlPipe} from '../../../pipes/pipe-transform/pipe-transform';

@Component({
  selector: 'app-playlist-card',
  imports: [DecodeHtmlPipe],
  templateUrl: './playlist-card.html',
  styleUrl: './playlist-card.css',
})
export class PlaylistCard {
  public playlist = input.required<SimplifiedPlaylist>();
}
