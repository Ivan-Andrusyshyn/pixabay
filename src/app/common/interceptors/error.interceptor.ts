import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  const authService = inject(AuthService);
  const token = localStorage.getItem('access_token');

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Retry Interceptor Functional Error:', error);
      notificationService.setNotification(error.message);

      if (token && error.status === 401) {
        router.navigate(['/unauthorize']);
      } else if (error.status === 404) {
        console.error('Resource not found.');
      } else if (error.status === 500) {
        console.error('Server error.');
      }
      authService.logout();
      return throwError(() => error);
    })
  );
};
