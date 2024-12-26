import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Observable, of } from 'rxjs';

import { routeList, RouteList } from './route-list';
import { AuthService } from '../services/auth.service';
import { HeaderNavComponent } from '../../components/header-nav/header-nav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderNavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  routes: RouteList[] = routeList;
  isAuth$!: Observable<boolean>;
  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.isAuth$ = of(false);
    this.router.navigate(['/auth/login']);
  }
}
