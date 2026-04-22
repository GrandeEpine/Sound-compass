import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Callback } from './features/callback/callback';

export const routes: Routes = [
  { path: 'callback', component: Callback },
  { path: 'home', component: Home },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
