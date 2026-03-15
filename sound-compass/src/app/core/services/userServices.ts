import {inject, Injectable} from '@angular/core';
import {Auth} from './auth';
import {SpotifyImage, User} from '../models/user';
import {UserProfile} from '@spotify/web-api-ts-sdk';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private auth: Auth = inject(Auth);

  async getProfile(): Promise<User> {
    const data: UserProfile = await this.auth.SDK.currentUser.profile();
    return {
      id: data.id,
      country: data.country,
      name: data.display_name,
      email: data.email,
      followersCount: data.followers.total,
      product: data.product as 'premium' | 'free' | 'open',
      images: data.images.map((image: SpotifyImage): SpotifyImage => ({
        url: image.url,
        width: image.width,
        height: image.height,
      })),
      uri: data.uri
    };
  }
}
