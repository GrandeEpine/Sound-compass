import { Component, inject } from '@angular/core';
import { PlaylistList } from '../../shared/components/playlist-list/playlist-list';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlists',
  imports: [PlaylistList],
  templateUrl: './playlists.html',
  styleUrl: './playlists.css',
})
export class Playlists {
  private route = inject(ActivatedRoute);
  public currentN = 3;

  ngOnInit() {
    const routeN = Number(this.route.snapshot.queryParamMap.get('n'));
    if ( ! isNaN(Number(routeN)) && Number(routeN) > 1) {
      this.currentN = Number(routeN);
    }
  }
}
