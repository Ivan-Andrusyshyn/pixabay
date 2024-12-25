import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../common/services/auth.service';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent, NgIf, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  title: string = 'Sign in';

  authForm!: FormGroup;
  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['test@icloud.com', Validators.email],
      password: ['Test1111', Validators.required],
    });
  }

  login() {
    const formValue = this.authForm.value;
    this.authService
      .login(formValue)
      .pipe(
        catchError((err) => {
          throw err.message;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((resp: any) => {
        if (resp.access_token) {
          sessionStorage.setItem('access_token', resp.access_token);
          this.authService.setAuth(true);
          this.router.navigateByUrl('/home');
        }
      });
  }
}
