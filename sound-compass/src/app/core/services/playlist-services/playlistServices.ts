import { inject, Injectable } from '@angular/core';
import { Auth } from '../auth/auth';
import {
  AccessToken,
  Page,
  Playlist,
  SimplifiedPlaylist,
  Track,
  TrackItem,
} from '@spotify/web-api-ts-sdk';
import { UserServices } from '../user-services/userServices';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class PlaylistServices {
  private userService: UserServices = inject(UserServices);
  private auth: Auth = inject(Auth);

  /**
   * Get a playlist by its id.
   * @param id the playlist's id
   * @return: Promise<Playlist<Track>> a promise that resolves to the playlist with its tracks.
   */
  public getPlaylistById(id: string): Promise<Playlist<Track>> {
    return this.auth.SDK.playlists.getPlaylist(id);
  }

  /**
   * Get playlists of the current connected user.
   * @return : Promise<Page<SimplifiedPlaylist>> a promise that resolves to a page of playlists of the current user.
   */
  public getConnectedUserPlaylists(): Promise<Page<SimplifiedPlaylist>> {
    return this.auth.SDK.currentUser.playlists.playlists();
  }

  /**
   * Get the n first playlist of the current connected user.
   * @param n {number} the number of playlist desired.
   * @return Promise<SimplifiedPlaylist[]> of the n first playlists.
   */
  public async getNFirstPlaylists(n: number): Promise<SimplifiedPlaylist[]> {
    const playlists: Page<SimplifiedPlaylist> = await this.getConnectedUserPlaylists();
    return playlists.items.slice(0, n);
  }

  /**
   * Get playlists of a user by its id.
   * @param id {string} the user's id
   * @return : Promise<Page<Playlist<TrackItem>>> a promise that resolves to a page of playlists of the user.
   */
  public async getPlaylistsForUser(id: string): Promise<Page<Playlist<TrackItem>>> {
    return this.auth.SDK.playlists.getUsersPlaylists(id);
  }

  /**
   * Post a new playlist on the user profile
   * @param name
   * @param description
   * @param isPublic
   */
  public async postNewPlaylist(
    name: string,
    description: string,
    isPublic: boolean,
  ): Promise<Playlist> {
    const user: User | null = await this.userService.loadProfile();
    if (!user) {
      return Promise.reject(new Error('User not found'));
    }
    return this.auth.SDK.playlists.createPlaylist(user.id, {
      name: name,
      description: description,
      public: isPublic,
    });
  }

  public async deletePlaylist(id: string): Promise<void> {
    const token: AccessToken | null = await this.auth.SDK.getAccessToken();
    try {
      await fetch(`https://api.spotify.com/v1/playlists/${id}/followers`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token?.access_token}` },
      });
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
}
