import { CanActivateFn } from '@angular/router';

import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = Boolean(sessionStorage.getItem('access_token'));
  return of(isAuthenticated);
};
