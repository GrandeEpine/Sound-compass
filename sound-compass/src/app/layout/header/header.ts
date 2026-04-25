import { Component, inject } from '@angular/core';
import { UserServices } from '../../core/services/user-services/userServices';
import { LoginButton } from '../../shared/components/loginButton/loginButton';
import { LogoutButton } from '../../shared/components/logout-button/logout-button';

@Component({
  selector: 'app-header',
  imports: [LoginButton, LogoutButton],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected userServices = inject(UserServices);
  protected readonly console = console;
}
