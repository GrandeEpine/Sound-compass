import {inject, Injectable, signal} from '@angular/core';
import { Auth } from '../auth/auth';
import { Page, Playlist, PlaylistedTrack, Track, Tracks } from '@spotify/web-api-ts-sdk';
import { PlaylistServices } from '../playlist-services/playlistServices';

@Injectable({
  providedIn: 'root',
})
export class TrackServices {
  private auth: Auth = inject(Auth);
  private playlistServices: PlaylistServices = inject(PlaylistServices);
  public status = signal(0);

  /**
   * Put tracks in a playlist by its id. The tracks will be added to the end of the playlist.
   * @param tracks {Tracks} the tracks to be put in the playlist.
   * @param playlistId {string} the id of the playlist that will be updated with the tracks.
   * @return {Promise<void>} a promise that resolves when the tracks have been put in the playlist.
   */
  public async postTracksInPlaylist(tracks: Tracks, playlistId: string): Promise<void> {
    // We chunk the ids into arrays of 100 elements, because the Spotify API only allows to post 100 tracks at a time.
    const chunkedTrackUris: string[][] = this.chunkTracksUris(tracks);

    const playlist: Playlist<Track> = await this.playlistServices.getPlaylistById(playlistId);

    for (const chunk of chunkedTrackUris) {
      try {
        await this.auth.SDK.playlists.addItemsToPlaylist(playlist.id, chunk);
      } catch (e: unknown) {
        const error = e as Error;
        alert(error.message);
      }
    }
  }

  /**
   * Chunk the track uris into arrays of 100 elements, because the Spotify API only allows to post 100 tracks at a time.
   * @param tracks {Tracks} the tracks to chunk.
   * @return {string[][]} the chunked track uris.
   * @private
   */
  private chunkTracksUris(tracks: Tracks): string[][] {
    const trackIds: string[] = tracks.tracks.map((track: Track): string => track.uri);
    const chunks: string[][] = Array.from(
      { length: Math.ceil(trackIds.length / 100) },
      (_: unknown, i: number): string[] => trackIds.slice(i * 100, i * 100 + 100),
    );
    return chunks;
  }

  /**
   * Get the tracks from a playlist by its id.
   * @param playlistId {string} the id of the playlist.
   * @return {Promise<Set<Track>>} a promise that resolves to the tracks of the playlist.
   */
  public async getTracksFromPlaylist(playlistId: string): Promise<Set<Track>> {
    let allTracks: Set<Track> = new Set();
    const limit = 50 as const;
    let offset = 0;
    let page: Page<PlaylistedTrack<Track>>;
    let invalid = 0
    do {
      page = await this.auth.SDK.playlists.getPlaylistItems(playlistId, undefined, undefined, limit, offset);
      page.items.forEach((item) => {
        if (!item.track) {
          console.error("Track not found for playlist", item);
          invalid++;
        } else {
          allTracks.add(item.track)
        }
      })
      offset += page.items.length;
      this.status.set(offset);
    } while (page.next);
    console.error(`Found ${invalid} invalid tracks in playlist ${playlistId}`);
    this.status.set(0);
    return allTracks;
  }
}
