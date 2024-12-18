import { Component, inject, OnInit } from '@angular/core';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../common/services/auth.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  title: string = 'Sign in';

  authForm!: FormGroup;
  ngOnInit(): void {
    this.authForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.authForm.valueChanges.subscribe((value) => {
      if (this.authForm.valid) {
        this.authService
          .login(value)
          .pipe(
            catchError((err) => {
              throw err.message;
            })
          )
          .subscribe((res) => {
            console.log(res);
          });
      }
    });
  }
}
