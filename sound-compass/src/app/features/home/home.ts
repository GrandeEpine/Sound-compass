import { Component, inject, OnInit } from '@angular/core';
import { UserServices } from '../../core/services/user-services/userServices';
import { HomeAuthenticated } from './home-authenticated/home-authenticated';
import { HomeGuest } from './home-guest/home-guest';
import { Loading } from '../../shared/components/loading/loading';

@Component({
  selector: 'app-home',
  imports: [HomeAuthenticated, HomeGuest, Loading],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected userServices = inject(UserServices);

  ngOnInit(): void {
    if (!this.userServices.userProfile()) {
      this.userServices.loadProfile()
    }
  }
}
