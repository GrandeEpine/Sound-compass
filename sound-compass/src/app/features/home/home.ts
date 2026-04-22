import { Component, inject } from '@angular/core';
import { Login } from '../login/login';
import {UserServices} from '../../core/services/user-services/userServices';

@Component({
  selector: 'app-home',
  imports: [Login],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected userServices = inject(UserServices);
}
