import { Component, inject } from '@angular/core';
import { UserServices } from '../../../core/services/user-services/userServices';
import { PlaylistList } from '../../../shared/components/playlist-list/playlist-list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-authenticated',
  imports: [PlaylistList, RouterLink],
  templateUrl: './home-authenticated.html',
  styleUrl: './home-authenticated.css',
})
export class HomeAuthenticated {
  protected userServices = inject(UserServices);
}
