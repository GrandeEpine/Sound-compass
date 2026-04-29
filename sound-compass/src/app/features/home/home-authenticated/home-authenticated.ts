import { Component, inject } from '@angular/core';
import { UserServices } from '../../../core/services/user-services/userServices';
import { PlaylistList } from '../../../shared/components/playlist-list/playlist-list';

@Component({
  selector: 'app-home-authenticated',
  imports: [PlaylistList],
  templateUrl: './home-authenticated.html',
  styleUrl: './home-authenticated.css',
})
export class HomeAuthenticated {
  protected userServices = inject(UserServices);
}
