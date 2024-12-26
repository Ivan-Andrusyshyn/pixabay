import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { SelectComponent } from '../select/select.component';
import { Category } from '../../common/content/filter';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    SelectComponent,
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);

  authForm!: FormGroup;
  @Output() authSubmit = new EventEmitter();

  options = Category;
  interestControl!: FormControl;
  isLoginPage: boolean = false;
  isMultiSelector: boolean = true;

  ngOnInit() {
    this.activatedRoute.url
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((segments) => {
        this.isLoginPage = segments.map((s) => s.path).join('/') === 'login';
        this.authForm = this.isLoginPage
          ? this.createLoginForm()
          : this.createSignUpForm();
      });
    if (!this.isLoginPage) {
      this.interestControl = this.authForm.get('interest') as FormControl;
    }
  }

  private createSignUpForm(): FormGroup {
    return this.fb.group({
      name: ['test11', Validators.required],
      email: ['test@icloud.com', [Validators.required, Validators.email]],
      password: ['Test1111', [Validators.required, Validators.minLength(8)]],
      interest: [[], Validators.required],
    });
  }

  private createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['test@icloud.com', [Validators.required, Validators.email]],
      password: ['Test1111', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.authSubmit.emit(this.authForm.value);
    }
  }
}
