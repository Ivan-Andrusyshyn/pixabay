import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../common/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, NgIf, MatProgressSpinnerModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute);

  user$!: Observable<User | null>;

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    const user = JSON.parse(sessionStorage.getItem('user') ?? 'null');
    if (user) {
      this.user$ = of(user as User);
    } else {
      this.user$ = this.activeRoute.data.pipe(
        map((data) => {
          sessionStorage.setItem('user', JSON.stringify(data['user']));
          return data['user'];
        })
      );
    }
  }
}
