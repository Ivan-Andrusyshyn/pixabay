import { Component, inject, OnInit } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import {
  Pagination,
  PaginationComponent,
} from '../../components/pagination/pagination.component';
import { ImageListComponent } from '../../components/image-list/image-list.component';
import { HomeService } from '../../common/services/home.service';
import Image from '../../common/interfaces/image.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    ImageListComponent,
    PaginationComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  images!: Observable<Image[]>;
  private readonly homeService = inject(HomeService);

  ngOnInit(): void {
    this.images = this.images = this.getImagesPagination({
      pageIndex: 1,
      pageSize: 10,
    });
  }

  handlePageEvent({ pageIndex, pageSize }: Pagination) {
    this.images = this.getImagesPagination({ pageIndex, pageSize });
  }

  private getImagesPagination({ pageIndex, pageSize }: Pagination) {
    return this.homeService.getAllImages(pageIndex, pageSize).pipe(
      catchError((err) => {
        throw err.message;
      })
    );
  }
}
