import {inject, Injectable} from '@angular/core';
import {Auth} from '../auth/auth';
import {Artist} from "@spotify/web-api-ts-sdk";

@Injectable({
  providedIn: 'root',
})
export class ArtistServices {
  private auth: Auth = inject(Auth);

  /**
   * Get a promise of an artist by their id.
   * @param id {string} the id of the artist.
   * @return {Promise<Artist>} a promise that resolves to the artist with the given id.
   */
  public async getArtistById(id: string):Promise<Artist> {
    return this.auth.SDK.artists.get(id);
  }
}
