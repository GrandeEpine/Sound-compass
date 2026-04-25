import { inject, Injectable, signal } from '@angular/core';
import { Auth } from '../auth/auth';
import { User } from '../../models/user';
import { UserProfile } from '@spotify/web-api-ts-sdk';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private auth: Auth = inject(Auth);

  userProfile = signal<User | null>(null);

  /**
   * Load the profile of the connected user
   * @return {Promise<undefined>} the profile of the connected user.
   */
  public async loadProfile(): Promise<User | null> {
    const profile: UserProfile = await this.auth.SDK.currentUser.profile();
    console.log('raw images:', profile.images);
    this.userProfile.set({
      id: profile.id,
      country: profile.country,
      name: profile.display_name,
      email: profile.email ?? '',
      followersCount: profile.followers.total,
      product: profile.product as 'free' | 'premium' | 'open',
      images: profile.images ?? [],
      uri: profile.uri,
    });
    return this.userProfile();
  }
}
