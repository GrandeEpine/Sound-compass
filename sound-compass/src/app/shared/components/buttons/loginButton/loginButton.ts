import { Component, inject } from '@angular/core';
import { Auth } from '../../../../core/services/auth/auth';
import { UserServices } from '../../../../core/services/user-services/userServices';
import { Router } from '@angular/router';
import { UserRole } from '../../../../core/models/enums/user-role';

@Component({
  selector: 'app-login-button',
  imports: [],
  templateUrl: './loginButton.html',
  styleUrl: './loginButton.css',
})
export class LoginButton {
  protected auth = inject(Auth);
  protected userServices = inject(UserServices);
  private router = inject(Router);

  async login(): Promise<void> {
    try {
      const authenticated: boolean = await this.auth.authenticate();
      if (authenticated) {
        await this.userServices.loadProfile();
      } else {
        // User cancelled - reset to guest
        this.resetToGuest();
      }
    } catch (error) {
      // User cancelled or error occurred
      this.resetToGuest();
    }
  }

  private resetToGuest(): void {
    this.auth.setUserRole(UserRole.GUEST);
    this.userServices.userProfile.set(null);
    this.userServices.isLoading.set(false);
    this.router.navigate(['/home']);
  }
}
