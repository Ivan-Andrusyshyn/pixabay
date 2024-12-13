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
import { ImageListComponent } from '../../components/image-list/image-list.component';
import { HomeService } from '../../common/services/home.service';
import Image from '../../common/interfaces/image.interface';
import { Order } from '../../common/content/filter';
import { SelectComponent } from '../../components/select/select.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    ImageListComponent,
    PaginationComponent,
    AsyncPipe,
    SelectComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  images!: Observable<Image[]>;
  totalLength = new BehaviorSubject(0);
  totalLength$: Observable<number> = this.totalLength.asObservable();
  orders: string[] = Order;
  orderControl = new FormControl('');

  private readonly homeService = inject(HomeService);

  constructor() {
    this.orderControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((order) => {
        this.images = this.images = this.getImagesPagination({
          pageIndex: 1,
          pageSize: 10,
        });
      });
  }
  ngOnInit(): void {
    this.images = this.images = this.getImagesPagination({
      pageIndex: 1,
      pageSize: 10,
    });

    this.totalLength$ = this.homeService.getTotalNumber();
  }

  handlePageEvent({ pageIndex, pageSize }: Pagination) {
    this.images = this.getImagesPagination({ pageIndex, pageSize });
  }

  private getImagesPagination({ pageIndex, pageSize }: Pagination) {
    return this.homeService
      .getAllImages(pageIndex, pageSize, [this.orderControl.value ?? ''])
      .pipe(
        catchError((err) => {
          throw err.message;
        })
      );
  }
}
