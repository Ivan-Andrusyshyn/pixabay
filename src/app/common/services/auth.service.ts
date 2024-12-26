import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { AuthUser, LoginUser, User } from '../interfaces/user.interface';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuth = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<User | null>(null);

  isAuth$ = this.isAuth.asObservable();
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    if (sessionStorage.getItem('access_token')) {
      this.setAuth(true);
    } else {
      this.setAuth(false);
    }
  }

  login(user: LoginUser): Observable<any> {
    return this.http
      .post<AuthUser>(environment.apiUrl + '/auth' + '/signin', user)
      .pipe(
        catchError((err) => {
          throw err.message;
        })
      );
  }
  signUp(user: User): Observable<any> {
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
  setUser(value: User) {
    this.user.next(value);
  }
  setAuth(value: boolean) {
    this.isAuth.next(value);
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
    this.isAuth.next(false);
  }
}
