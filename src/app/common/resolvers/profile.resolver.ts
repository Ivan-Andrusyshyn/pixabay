import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const profileResolver: ResolveFn<Object> = (route, state) => {
  const authService = inject(AuthService);
  authService.checkAuth()?.subscribe();
  return authService.user$;
};
