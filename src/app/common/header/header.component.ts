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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, HeaderNavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  routes: RouteList[] = routeList;
  isAuth$!: Observable<boolean>;
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.isAuth$ = of(!!sessionStorage.getItem('access_token'));
  }

  logout() {
    this.authService.logout();
  }
}
