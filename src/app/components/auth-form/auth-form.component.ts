import { NgIf } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SelectComponent } from '../select/select.component';
import { Category } from '../../common/content/filter';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
})
export class AuthFormComponent {
  private destroyRef = inject(DestroyRef);

  @Input() authForm!: FormGroup;
  @Output() submit = new EventEmitter();
  options = Category;
  interestControl!: FormControl;
  isLoginPage: boolean = false;
  isMultiSelector: boolean = true;
  activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activatedRoute.url
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((segments) => {
        this.isLoginPage = segments.map((s) => s.path).join('/') === 'login';
      });
    if (!this.isLoginPage) {
      this.interestControl = this.authForm.get('interest') as FormControl;
    }
  }

  onSubmit() {
    this.submit.emit();
  }
}
