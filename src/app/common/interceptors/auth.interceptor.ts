import { HttpInterceptorFn } from '@angular/common/http';

import { environment } from '../../env/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = sessionStorage.getItem('access_token');
  let newReq;
  const isAuthUrl = req.url.includes(environment.apiUrl);

  if (accessToken && isAuthUrl) {
    newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return next(newReq);
  } else {
    newReq = req.clone({
      setHeaders: {},
    });

    return next(newReq);
  }
};
