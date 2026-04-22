import { Component, inject } from '@angular/core';
import { Auth } from '../../../core/services/auth/auth';
import { UserServices } from '../../../core/services/user-services/userServices';

@Component({
  selector: 'app-login-button',
  imports: [],
  templateUrl: './loginButton.html',
  styleUrl: './loginButton.css',
})
export class LoginButton {
  protected auth = inject(Auth);
  protected userServices = inject(UserServices);

  async login(): Promise<void> {
    const authenticated: boolean = await this.auth.authenticate();
    if (authenticated) {
      await this.userServices.loadProfile();
    }
  }
}
