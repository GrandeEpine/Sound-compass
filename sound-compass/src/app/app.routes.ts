import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Callback } from './features/callback/callback';
import { Login } from './features/login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'callback', component: Callback },
  { path: 'home', component: Home },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
