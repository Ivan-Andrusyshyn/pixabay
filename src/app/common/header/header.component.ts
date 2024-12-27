import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { routeList, RouteList } from './route-list';
import { AuthService } from '../services/auth.service';
import { HeaderNavComponent } from '../../components/header-nav/header-nav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderNavComponent, MatButtonModule, MatMenuModule],
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
