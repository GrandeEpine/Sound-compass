import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PlaylistCard } from '../cards/playlist-card/playlist-card';
import { PlaylistServices } from '../../../core/services/playlist-services/playlistServices';
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';


@Component({
  selector: 'app-playlist-list',
  imports: [PlaylistCard],
  templateUrl: './playlist-list.html',
  styleUrl: './playlist-list.css',
})
export class PlaylistList implements OnInit {
  protected playlistService = inject(PlaylistServices);

  public playlists = signal<SimplifiedPlaylist[]>([]);
  public isLoading = signal<boolean>(true);

  n = input.required<number>();

  async ngOnInit(): Promise<void> {
    console.log("hello PlaylistList");
    if (this.n() < 1) {
      alert('The number of playlists to display must be at least 1.');
      return;
    }
    this.isLoading.set(true);
    this.playlists.set(await this.playlistService.getNFirstPlaylists(this.n()));
    this.isLoading.set(false);
  }
}
