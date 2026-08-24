import { Component, inject, OnInit } from '@angular/core';
import { Home } from '../home/home';
import { UserServices } from '../../core/services/user-services/userServices';
import { Auth } from '../../core/services/auth/auth';
import { UserRole } from '../../core/models/enums/user-role';
import { QueryParametersService } from '../../core/services/query-parameters-service/query-parameters-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  imports: [Home],
  templateUrl: './callback.html',
  styleUrl: './callback.css',
})
export class Callback implements OnInit {
  private userServices = inject(UserServices);
  private auth = inject(Auth);
  private queryParams = inject(QueryParametersService);
  private router = inject(Router);

  ngOnInit(): void {
    const code = this.queryParams.get('code');
    const error = this.queryParams.get('error');

    if (error) {
      this.resetToGuest();
      return;
    }

    if (code) {
      this.auth.setUserRole(UserRole.USER);
      this.userServices.loadProfile().catch(err => {
        console.error('Error loading profile:', err);
      });
    }
  }

  private resetToGuest(): void {
    this.auth.setUserRole(UserRole.GUEST);
    this.userServices.userProfile.set(null);
    this.userServices.isLoading.set(false);
    this.router.navigate(['/home']);
  }
}
