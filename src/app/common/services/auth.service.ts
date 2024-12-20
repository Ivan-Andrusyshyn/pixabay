import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { AuthUser, LoginUser, User } from '../interfaces/user.interface';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private isAuth = new BehaviorSubject<boolean>(false);
  isAuth$ = this.isAuth.asObservable();

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
}
