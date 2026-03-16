import { inject, Injectable } from '@angular/core';
import { Auth } from '../auth/auth';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private auth: Auth = inject(Auth);

  /**
   * The profile of the connected user. It is a promise that resolves to the user's profile.
   * @private
   */
  private profile?: Promise<User>;

  /**
   * Get the profile of the connected user
   * @return {Promise<User>} the profile of the connected user.
   */
  public async getProfile(): Promise<User> {
    if (!this.profile) {
      this.profile = this.auth.SDK.currentUser.profile().then(
        (profile): User => ({
          id: profile.id,
          country: profile.country,
          name: profile.display_name,
          email: profile.email ?? '',
          followersCount: profile.followers.total,
          product: profile.product as 'free' | 'premium' | 'open',
          images: profile.images,
          uri: profile.uri,
        }),
      );
    }
    return this.profile;
  }
}
