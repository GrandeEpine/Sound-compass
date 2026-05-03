import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PlaylistCard } from '../cards/playlist-card/playlist-card';
import { Loading } from '../loading/loading';
import { PlaylistServices } from '../../../core/services/playlist-services/playlistServices';
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import {QueryParametersService} from '../../../core/services/queryParametersService/query-parameters-service';


@Component({
  selector: 'app-playlist-list',
  imports: [PlaylistCard, Loading],
  templateUrl: './playlist-list.html',
  styleUrl: './playlist-list.css',
})
export class PlaylistList implements OnInit {
  private playlistService = inject(PlaylistServices);
  private queryParametersService = inject(QueryParametersService);

  n = input<number>(0); // 0 = affiche tout
  public isLoading = signal<boolean>(true);
  public playlists = signal<SimplifiedPlaylist[]>([]);
  public currentN = 3;

   async ngOnInit() {
     const inputN = this.n();
     const routeN = Number(this.queryParametersService.get('n'));
     if ( isNaN(Number(routeN)) || Number(routeN) < 1) {
       if (inputN > 0 && ! isNaN(inputN)) {
         this.currentN = inputN;
       } else {
         this.currentN = 3;
       }
     } else {
        this.currentN = routeN;
     }

     this.isLoading.set(true);
     this.playlists.set(await this.playlistService.getNFirstPlaylists(this.currentN));
     this.isLoading.set(false);

   }
}
