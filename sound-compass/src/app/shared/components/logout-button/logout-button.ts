import { Component, inject } from '@angular/core';
import { UserServices } from '../../../core/services/user-services/userServices';
import { Auth } from '../../../core/services/auth/auth';
import { UserRole } from '../../../core/models/user-role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  imports: [],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.css',
})
export class LogoutButton {
  protected userServices = inject(UserServices);
  private auth: Auth = inject(Auth);
  private router = inject(Router);

  async logout(): Promise<void> {
    // 1. Cleanse the user profile
    this.userServices.userProfile.set(null);
    // 2. Set the user role to guest
    this.auth.setUserRole(UserRole.GUEST);
    // 3. Empty Spotify's tokens
    this.auth.logout();
    // 4. Redirect to the home-guest page
    await this.router.navigate(['/home']);
  }
}
