import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: { name: string; password: string }) {
    return this.http.post('http://localhost:4200/auth/login', user).pipe(
      catchError((err) => {
        throw err.message;
      })
    );
  }
}
