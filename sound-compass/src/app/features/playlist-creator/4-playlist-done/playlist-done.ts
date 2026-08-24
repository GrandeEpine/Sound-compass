import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-playlist-done',
  imports: [],
  templateUrl: './playlist-done.html',
  styleUrl: './playlist-done.css',
})
export class PlaylistDone {
  protected isLoading = signal<boolean>(true);
}
