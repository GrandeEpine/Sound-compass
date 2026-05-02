import { inject, Injectable, signal } from '@angular/core';
import { Auth } from '../auth/auth';
import { User } from '../../models/user';
import { UserProfile } from '@spotify/web-api-ts-sdk';
import {UserRole} from '../../models/user-role';
import {LocalStorageVariables} from '../../models/local-storage-variables';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private auth: Auth = inject(Auth);

  userProfile = signal<User | null>(null);

  isLoading = signal<boolean>(true);
  /**
   * Load the profile of the connected user
   * @return {Promise<undefined>} the profile of the connected user.
   */
  public async loadProfile(): Promise<User | null> {
    this.isLoading.set(true);
    const profile: UserProfile = await this.auth.SDK.currentUser.profile();
    this.userProfile.set({
      id: profile.id,
      country: profile.country,
      name: profile.display_name,
      email: profile.email ?? '',
      followersCount: profile.followers.total,
      product: profile.product as 'free' | 'premium' | 'open',
      images: profile.images ?? [],
      uri: profile.uri,
      userRole: UserRole.USER,
    });
    this.auth.setUserRole(UserRole.USER);
    this.isLoading.set(false);
    return this.userProfile();
  }
}
