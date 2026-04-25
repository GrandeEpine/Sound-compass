import { Component, inject, OnInit } from '@angular/core';
import {UserServices} from '../../core/services/user-services/userServices';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected userServices = inject(UserServices);

  ngOnInit(): void {
    // Load profile if not already loaded and user is authenticated
    if (!this.userServices.userProfile()) {
      this.userServices.loadProfile().catch(() => {
        console.log('User not authenticated yet');
      });
    }
  }
}
