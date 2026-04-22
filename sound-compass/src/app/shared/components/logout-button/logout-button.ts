import { Component, inject } from '@angular/core';
import { UserServices } from '../../../core/services/user-services/userServices';
import { Auth } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-logout-button',
  imports: [],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.css',
})
export class LogoutButton {
  protected userServices = inject(UserServices);
  private auth: Auth = inject(Auth);

  async logout(): Promise<void> {
    this.userServices.userProfile.set(null);
    this.auth.logout();
  }
}
