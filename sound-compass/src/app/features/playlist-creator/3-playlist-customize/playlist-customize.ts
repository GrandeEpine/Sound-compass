import {Component, inject, output, signal} from '@angular/core';
import {GenreServices} from '../../../core/services/genre-services/genre-services';
import {Genre} from '../../../core/models/genre';
import { ValidateButton } from '../../../shared/components/buttons/validate-button/validate-button';
import {PlaylistCustomization} from '../../../core/models/playlist-customization';

@Component({
  selector: 'app-playlist-customize',
  imports: [ValidateButton],
  templateUrl: './playlist-customize.html',
  styleUrl: './playlist-customize.css',
})
export class PlaylistCustomize {
  private APP_DESCRIPTION = "Made with Sound Compass";
  protected playlistName = signal<string | null>("");
  protected playlistDescription = signal<string | null>("");
  protected next = output<PlaylistCustomization>();

  confirm() {

    if (this.playlistName() === null || this.playlistName() === "") {
      return;
    }
    const description: string = this.APP_DESCRIPTION + this.playlistDescription();
    console.log(description);
    console.log(this.playlistName())
    this.next.emit({name: this.playlistName() ?? "", description: description});
  }
}
