import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthService } from '../../common/services/auth.service';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  title: string = 'Sign in';

  login(formValue: any) {
    this.authService
      .login(formValue)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          throw err.message;
        })
      )
      .subscribe((resp) => {
        if (resp.user) {
          this.authService.setUser(resp.user);
          this.authService.setAuth(true);
          sessionStorage.setItem('access_token', resp.access_token);
          this.router.navigateByUrl('/home');
        }
      });
  }
}
