import { Injectable } from '@angular/core';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { environment } from '../../../../environments/environment.development';
import {UserRole} from '../../models/user-role';
import {LocalStorageVariables} from '../../models/local-storage-variables';

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
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-private',
    'user-read-email',
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

  public getUserRole(): string {
    return localStorage.getItem(LocalStorageVariables.USER_ROLE) ?? UserRole.GUEST;
  }

  public setUserRole(userRole: string): void {
    if (Object.values(UserRole).includes(userRole as UserRole)) {
      localStorage.setItem(LocalStorageVariables.USER_ROLE, userRole);
    }
  }
  async authenticate(): Promise<boolean> {
    const response = await this.SDK.authenticate();
    return response.authenticated;
  }

  /**
   * Clear the cached token to force re-authentication
   */
  logout(): void {
    localStorage.removeItem('spotify-sdk:AuthorizationCodeWithPKCEStrategy:token');
    sessionStorage.removeItem('spotify-sdk:AuthorizationCodeWithPKCEStrategy:token');
    localStorage.removeItem(LocalStorageVariables.USER_ROLE);
  }
}
