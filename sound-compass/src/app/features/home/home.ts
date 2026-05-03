import { Component, inject, OnInit } from '@angular/core';
import { UserServices } from '../../core/services/user-services/userServices';
import { Auth } from '../../core/services/auth/auth';
import { HomeAuthenticated } from './home-authenticated/home-authenticated';
import { HomeGuest } from './home-guest/home-guest';
import { Loading } from '../../shared/components/loading/loading';
import { UserRole } from '../../core/models/enums/user-role';

@Component({
  selector: 'app-home',
  imports: [HomeAuthenticated, HomeGuest, Loading],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected userServices = inject(UserServices);
  private auth = inject(Auth);

  ngOnInit(): void {
    // Load profile if user is authenticated but profile is not loaded
    if (this.auth.getUserRole() === UserRole.USER && !this.userServices.userProfile()) {
      this.userServices.loadProfile().catch(err => {
        console.error('[HOME] Error loading profile:', err);
      });
    }
  }
}
