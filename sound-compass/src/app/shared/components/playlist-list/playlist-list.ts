import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PlaylistCard } from '../cards/playlist-card/playlist-card';
import { Loading } from '../loading/loading';
import { ActivatedRoute } from '@angular/router';
import { PlaylistServices } from '../../../core/services/playlist-services/playlistServices';
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';


@Component({
  selector: 'app-playlist-list',
  imports: [PlaylistCard, Loading],
  templateUrl: './playlist-list.html',
  styleUrl: './playlist-list.css',
})
export class PlaylistList implements OnInit {
  private playlistService = inject(PlaylistServices);
  private route = inject(ActivatedRoute);

  n = input<number>(0); // 0 = affiche tout
  public isLoading = signal<boolean>(true);
  public playlists = signal<SimplifiedPlaylist[]>([]);
  public currentN = 3;

   async ngOnInit() {
     const inputN = this.n();
     const routeN = Number(this.route.snapshot.queryParamMap.get('n'));
     console.log(routeN);
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
