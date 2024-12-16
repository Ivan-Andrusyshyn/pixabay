import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { FormControl } from '@angular/forms';

import {
  Pagination,
  PaginationComponent,
} from '../../components/pagination/pagination.component';
import { HomeService } from '../../common/services/home.service';
import { Order } from '../../common/content/filter';
import { SelectComponent } from '../../components/select/select.component';
import { SlideToggleComponent } from '../../components/slide-toggle/slide-toggle.component';
import { MediaListComponent } from '../../components/media-list/media-list.component';
import { SwitchMediaService } from '../../common/services/switchmedia.service';
import { MediaItem } from '../../common/interfaces/media.inteface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MediaListComponent,
    PaginationComponent,
    AsyncPipe,
    SelectComponent,
    SlideToggleComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  media$!: Observable<MediaItem[]>;

  totalLength = new BehaviorSubject(0);
  totalLength$: Observable<number> = this.totalLength.asObservable();
  orders: string[] = Order;
  orderControl = new FormControl('');
  isImages = true;
  private readonly homeService = inject(HomeService);
  private readonly mediaService = inject(SwitchMediaService);

  constructor() {
    this.orderControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((order) => {
        this.media$ = this.getImagesPagination({
          pageIndex: 1,
          pageSize: 10,
        });
      });
  }
  ngOnInit(): void {
    this.media$ = this.getImagesPagination({
      pageIndex: 1,
      pageSize: 10,
    });

    this.totalLength$ = this.homeService.getTotalNumber();
  }

  handlePageEvent({ pageIndex, pageSize }: Pagination) {
    this.media$ = this.getImagesPagination({ pageIndex, pageSize });
  }

  onToggle(isToggle: boolean) {
    this.isImages = isToggle;
    this.mediaService.toggleMedia(isToggle);
  }

  private getImagesPagination({ pageIndex, pageSize }: Pagination) {
    return this.homeService
      .getAllImages(this.isImages, pageIndex, pageSize, [
        this.orderControl.value ?? '',
      ])
      .pipe(
        catchError((err) => {
          throw err.message;
        })
      );
  }
}
