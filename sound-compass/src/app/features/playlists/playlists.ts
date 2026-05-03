import { Component, inject } from '@angular/core';
import { PlaylistList } from '../../shared/components/playlist-list/playlist-list';
import {QueryParametersService} from "../../core/services/query-parameters-service/query-parameters-service";

@Component({
  selector: 'app-playlists',
  imports: [PlaylistList],
  templateUrl: './playlists.html',
  styleUrl: './playlists.css',
})
export class Playlists {
  private queryParametersService = inject(QueryParametersService);
  public currentN = 3;

  ngOnInit() {
    const routeN = Number(this.queryParametersService.get('n'));
    if ( ! isNaN(Number(routeN)) && Number(routeN) > 1) {
      this.currentN = Number(routeN);
    }
  }
}
