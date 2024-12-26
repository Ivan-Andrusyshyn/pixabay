import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor, RouterLink],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderNavComponent {
  @Input() routes!: any[];
  @Output() logout = new EventEmitter();

  private authService = inject(AuthService);

  isAuth$!: Observable<boolean>;

  ngOnInit(): void {
    this.isAuth$ = this.authService.isAuth$;
  }
  onLogout() {
    this.logout.emit();
  }
}
