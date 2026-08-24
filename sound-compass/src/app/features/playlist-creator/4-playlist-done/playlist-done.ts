import {Component, inject, input, OnInit, signal} from '@angular/core';
import {PlaylistServices} from '../../../core/services/playlist-services/playlistServices';
import {Loading} from '../../../shared/components/loading/loading';
import {PlaylistCustomization} from '../../../core/models/playlist-customization';
import {Genre} from '../../../core/models/genre';
import {PlaylistCreationStatus} from '../../../core/models/enums/playlist-creation-status';
import {TrackServices} from '../../../core/services/track-services/track-services';
import {Track, Tracks} from '@spotify/web-api-ts-sdk';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {DeleteButton} from '../../../shared/components/buttons/delete-button/delete-button';


@Component({
  selector: 'app-playlist-done',
  imports: [Loading, DeleteButton],
  templateUrl: './playlist-done.html',
  styleUrl: './playlist-done.css',
})
export class PlaylistDone implements OnInit {

  private playlistService = inject(PlaylistServices);
  private trackService = inject(TrackServices);
  private sanitizer = inject(DomSanitizer);

  public playlistInfo = input.required<PlaylistCustomization>();
  public playlistGenres = input.required<Set<Genre>>();

  protected status = signal<PlaylistCreationStatus>(PlaylistCreationStatus.CREATING)
  protected isLoading = signal<boolean>(true);
  protected newPlaylistId = signal<string | null>(null);
  protected playlistEmbedUrl = signal<SafeResourceUrl | null>(null);

  async ngOnInit() : Promise<void>  {
    console.log("ngOnInit");
    this.isLoading.set(true);
    try {
      const newPlaylist = await this.playlistService.postNewPlaylist(
        this.playlistInfo().name,
        this.playlistInfo().description,
        this.playlistInfo().isPublic);
      this.newPlaylistId.set(newPlaylist.id)
      this.playlistEmbedUrl.set(
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://open.spotify.com/embed/playlist/${newPlaylist.id}`,
        ),
      );
      this.status.set(PlaylistCreationStatus.FILLING);

      const tracksById = new Map<string, Track>();

      this.playlistGenres().forEach((genre: Genre) => {
        genre.getTracks().forEach((track: Track) => {
          if (track.id && !tracksById.has(track.id)) {
            tracksById.set(track.id, track);
          }
        });
      });
      const uniqueTracksArray = Array.from(tracksById.values());
      const tracks: Tracks = { tracks: uniqueTracksArray };

      await this.trackService.postTracksInPlaylist(tracks, newPlaylist.id )
      this.status.set(PlaylistCreationStatus.FINISHED);
    } catch (e) {
      console.error('Error while creating/filling playlist', e);
      this.status.set(PlaylistCreationStatus.ERROR ?? PlaylistCreationStatus.CREATING);
    } finally {
      this.isLoading.set(false);
    }
  }

}
