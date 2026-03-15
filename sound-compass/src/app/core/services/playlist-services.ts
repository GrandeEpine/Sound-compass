import {inject, Injectable} from '@angular/core';
import {Auth} from './auth';
import {Page, Playlist, PlaylistedTrack, SimplifiedPlaylist, Track, TrackItem} from '@spotify/web-api-ts-sdk';
import {UserServices} from './userServices';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class PlaylistServices {
  private auth: Auth = inject(Auth);
  private userService: UserServices = inject(UserServices);
  private user: Promise<User> = this.userService.getProfile();

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
  public getConnectedUserPlaylist(): Promise<Page<SimplifiedPlaylist>> {
    return this.auth.SDK.currentUser.playlists.playlists();
  }

  /**
   * Get playlists of a user by its id.
   * @param id {string} the user's id
   * @return : Promise<Page<Playlist<TrackItem>>> a promise that resolves to a page of playlists of the user.
   */
  public async getPlaylistsForUser(id: string): Promise<Page<Playlist<TrackItem>>> {
    const user: User = await this.userService.getProfile();
    return this.auth.SDK.playlists.getUsersPlaylists(id);
  }
}
