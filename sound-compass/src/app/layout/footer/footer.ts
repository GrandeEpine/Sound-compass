import { Component, inject } from '@angular/core';
import { UserServices } from '../../core/services/user-services/userServices';
import { LogoutButton } from '../../shared/components/buttons/logout-button/logout-button';
import { LoginButton } from '../../shared/components/buttons/loginButton/loginButton';

@Component({
  selector: 'app-footer',
  imports: [LogoutButton, LoginButton],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected userServices = inject(UserServices);
  protected currentYear: number = new Date().getFullYear();
}
