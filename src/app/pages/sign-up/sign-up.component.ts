import { FormGroup } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  title: string = 'Sign up';

  signUp(formValue: any) {
    this.authService
      .signUp(formValue)
      .pipe(takeUntilDestroyed(this.destroyRef))
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
