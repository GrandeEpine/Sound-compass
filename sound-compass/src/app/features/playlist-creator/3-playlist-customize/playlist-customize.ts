import {Component, output, signal} from '@angular/core';
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
  protected isPublic = signal<boolean>(false);
  protected next = output<PlaylistCustomization>();

  confirm() {

    if (this.playlistName() === null || this.playlistName() === "") {
      return;
    }
    const description: string = this.APP_DESCRIPTION + this.playlistDescription();
    this.next.emit({name: this.playlistName() ?? "", description: description, isPublic: this.isPublic()});
  }

  protected setPrivacy(isPublic: boolean): void {
    this.isPublic.set(isPublic);
  }
}
