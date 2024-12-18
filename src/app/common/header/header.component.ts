import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { routeList, RouteList } from './route-list';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  routes: RouteList[] = routeList;
  isAuth$!: Observable<boolean>;
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.isAuth$ = this.authService.isAuth$;
  }
}
