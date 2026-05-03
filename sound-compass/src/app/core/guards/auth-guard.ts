import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth/auth';
import {UserRole} from '../models/enums/user-role';


export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  if (auth.getUserRole() === UserRole.USER) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
