import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Callback } from './features/callback/callback';
import { Playlists } from './features/playlists/playlists';
import { UserRole } from './core/models/user-role';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'callback', component: Callback },
  { path: 'home', component: Home },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'my-playlists',
    component: Playlists,
    canActivate: [authGuard],
    data: { expectedRole: UserRole.USER },
  },
];
