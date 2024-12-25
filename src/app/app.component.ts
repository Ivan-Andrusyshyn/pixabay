import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { LoadingService } from './common/services/loading.service';
import { AuthService } from './common/services/auth.service';
import { NotificationService } from './common/services/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    NgIf,
    ProgressBarComponent,
    FooterComponent,
    HeaderComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private loadingService = inject(LoadingService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  loading$!: Observable<boolean>;
  isReqMethodGet$!: Observable<boolean>;

  ngOnInit(): void {
    this.authService
      .checkAuth()
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.loading$ = this.loadingService.isLoading();
    this.isReqMethodGet$ = this.loadingService.getCurrentRequestMethod();
  }
}
