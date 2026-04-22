import { Component } from '@angular/core';
import { LoginButton } from '../../shared/components/loginButton/loginButton';

@Component({
  selector: 'app-login',
  imports: [LoginButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
