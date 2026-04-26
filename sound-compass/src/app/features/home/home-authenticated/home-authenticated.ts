import { Component, inject } from '@angular/core';
import { UserServices } from '../../../core/services/user-services/userServices';

@Component({
  selector: 'app-home-authenticated',
  imports: [],
  templateUrl: './home-authenticated.html',
  styleUrl: './home-authenticated.css',
})
export class HomeAuthenticated {
  protected userServices = inject(UserServices);
}
