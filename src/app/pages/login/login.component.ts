import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, delay } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthService } from '../../common/services/auth.service';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent, NgIf, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  timeout: any;
  private destroyRef = inject(DestroyRef);

  title: string = 'Sign in';

  isSuccessResponse = new BehaviorSubject(false);
  isSuccessResponse$ = this.isSuccessResponse.asObservable();
  authForm!: FormGroup;
  error: string = '';
  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['test@icloud.com', Validators.email],
      password: ['Test1111', Validators.required],
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

  login() {
    const formValue = this.authForm.value;
    this.authService
      .login(formValue)
      .pipe(
        catchError((err) => {
          this.isSuccessResponse.next(true);
          this.error = err;
          throw err.message;
        })
      )
      .subscribe((resp: any) => {
        if (resp.access_token) {
          localStorage.setItem('access_token', resp.access_token);
          this.isSuccessResponse.next(true);
        }
      });
  }
}
