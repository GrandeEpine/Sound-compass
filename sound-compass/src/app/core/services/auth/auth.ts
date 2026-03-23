import { Injectable } from '@angular/core';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  /**
   * @private The redirect URI registered with Spotify for the application.
   */
  private static readonly REDIRECT_URI: string = 'http://127.0.0.1:4200/callback';

  /**
   * @private Scopes used for the authorization process.
   */
  private static readonly SCOPES: string[] = [
    'playlist-modify-private',
    'playlist-modify-public',
    'user-read-email',
    'user-read-private',
  ];

  /**
   * The SDK used to make request to the API.
   * @return {SpotifyApi} a SDK object to communicate with the Spotify API, initialized with user authorization.
   */
  public readonly SDK: SpotifyApi = SpotifyApi.withUserAuthorization(
    environment.spotifyClientId,
    Auth.REDIRECT_URI,
    Auth.SCOPES,
  );

  async authenticate(): Promise<boolean> {
    const response = await this.SDK.authenticate();
    return response.authenticated;
  }
}
