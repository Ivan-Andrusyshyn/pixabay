import { finalize, catchError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  if (req.method === 'GET') {
    let timer: ReturnType<typeof setTimeout>;

    loadingService.showLoadingSpinner();
    return next(req).pipe(
      finalize(() => {
        timer = setTimeout(() => {
          loadingService.hideLoadingSpinner();
        }, 1000);
        return () => clearTimeout(timer);
      }),

      catchError((err) => {
        console.error('HTTP Error:', err.message);
        throw err;
      })
    );
  } else {
    return next(req);
  }
};
