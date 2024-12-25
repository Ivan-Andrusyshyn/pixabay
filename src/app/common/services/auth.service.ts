import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { AuthUser, LoginUser, User } from '../interfaces/user.interface';
import { environment } from '../../env/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  private isAuth = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<User | null>(null);
  isAuth$ = this.isAuth.asObservable();
  user$ = this.user.asObservable();

  login(user: LoginUser) {
    return this.http
      .post<AuthUser>(environment.apiUrl + '/auth' + '/signin', user)
      .pipe(
        catchError((err) => {
          throw err.message;
        })
      );
  }
  signUp(user: User) {
    return this.http
      .post<AuthUser>(environment.apiUrl + '/auth' + '/signup', user)
      .pipe(
        catchError((err) => {
          throw err.message;
        })
      );
  }

  checkAuth() {
    const token = sessionStorage.getItem('access_token');
    if (!token) return;
    return this.http
      .get<AuthUser>(`${environment.apiUrl}/auth/check-token`)
      .pipe(
        map((res) => {
          if (res.user) {
            this.user.next(res.user);
            this.setAuth(true);
            return res.user;
          } else {
            this.logout();
            return null;
          }
        }),
        catchError((err) => {
          this.logout();
          return throwError(
            () => new Error(err.message || 'Authentication failed.')
          );
        })
      );
  }

  setAuth(value: boolean) {
    this.isAuth.next(value);
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
    this.isAuth.next(false);
  }
}
