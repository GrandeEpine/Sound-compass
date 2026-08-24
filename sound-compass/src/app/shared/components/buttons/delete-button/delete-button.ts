import {Component, inject, input} from '@angular/core';
import {PlaylistServices} from '../../../../core/services/playlist-services/playlistServices';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-button',
  imports: [],
  templateUrl: './delete-button.html',
  styleUrl: './delete-button.css',
})
export class DeleteButton {
  protected playlistService = inject(PlaylistServices);
  protected router = inject(Router);
  public playlistId = input.required<string>();

  async delete() {
    await this.playlistService.deletePlaylist(this.playlistId());
    await this.router.navigate(['/home']);
  }
}
