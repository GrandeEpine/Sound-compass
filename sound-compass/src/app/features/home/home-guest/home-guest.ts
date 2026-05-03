import { Component, inject } from '@angular/core';
import {LoginButton} from "../../../shared/components/buttons/loginButton/loginButton";
import { UserServices } from '../../../core/services/user-services/userServices';

@Component({
  selector: 'app-home-guest',
  imports: [LoginButton],
  templateUrl: './home-guest.html',
  styleUrl: './home-guest.css',
})
export class HomeGuest {
  protected userServices = inject(UserServices);
}
