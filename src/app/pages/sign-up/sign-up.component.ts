import { AsyncPipe, NgIf } from '@angular/common';
import { BehaviorSubject, delay } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../common/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SignupUser } from '../../../../server/src/interfaces/signup';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [AuthFormComponent, NgIf, AsyncPipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private timeout: any;
  private destroyRef = inject(DestroyRef);

  isSuccessResponse = new BehaviorSubject(true);
  isSuccessResponse$ = this.isSuccessResponse.asObservable();
  authForm!: FormGroup;
  title: string = 'Sign up';
  ngOnInit(): void {
    this.authForm = this.fb.group({
      name: ['test11', Validators.required],
      email: ['test@icloud.com', Validators.email],
      password: ['Test1111', Validators.required],
      interest: [[], Validators.required],
    });

    this.timeout = setTimeout(() => {
      this.isSuccessResponse.next(false);
    }, 1000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

  signUp() {
    const formValue = this.authForm.value;
    if (this.authForm.valid) {
      this.authService
        .signUp(formValue)
        .pipe()
        .subscribe((resp) => {
          if (resp.access_token) {
            localStorage.setItem('access_token', resp.access_token);
            this.isSuccessResponse.next(true);
          }
        });
    }
  }
}
