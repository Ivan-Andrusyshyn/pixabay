import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { BehaviorSubject, catchError, delay, map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import {
  Pagination,
  PaginationComponent,
} from '../../components/pagination/pagination.component';
import { ImageListComponent } from '../../components/image-list/image-list.component';
import Image from '../../common/interfaces/image.interface';
import { SearchService } from '../../common/services/search.service';
import { SearchControlComponent } from '../../components/search-control/search-control.component';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { Category } from '../../common/content/filter';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    PaginationComponent,
    ReactiveFormsModule,
    ImageListComponent,
    AsyncPipe,
    SearchControlComponent,
    CategoryFilterComponent,
    NgIf,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  searchService = inject(SearchService);

  images: Observable<Image[]> = new BehaviorSubject<Image[]>([]).asObservable();

  searchControl = new FormControl('');

  pageIndex = 1;
  pageSize = 10;
  categories = Category;
  totalLength$!: Observable<number>;
  currentCategory = new BehaviorSubject<string>('');
  currentCategory$ = this.currentCategory.asObservable();

  constructor() {
    this.currentCategory$.pipe(takeUntilDestroyed()).subscribe((category) => {
      if (this.searchControl.value?.trim()) {
        this.images = this.getImagesPagination(
          { pageIndex: this.pageIndex, pageSize: this.pageSize },
          this.searchControl.value ?? ''
        );
      }
    });
  }
  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(delay(1000)).subscribe((value) => {
      if (value?.trim()) {
        this.images = this.getImagesPagination(
          { pageIndex: this.pageIndex, pageSize: this.pageSize },
          value
        );
      } else {
        this.images = new BehaviorSubject<Image[]>([]).asObservable();
      }
    });

    this.totalLength$ = this.searchService.getTotalNumber();
  }
  ngOnDestroy(): void {
    this.resetSearch();
  }
  clearInput() {
    this.searchControl.reset();
    this.resetSearch();
  }
  selectCategory(value: string) {
    this.currentCategory.next(value);
  }
  handlePageEvent({ pageIndex, pageSize }: Pagination) {
    this.images = this.getImagesPagination(
      { pageIndex, pageSize },
      this.searchControl.value ?? ''
    );
  }

  private resetSearch() {
    this.searchService.resetTotalNumber();
    this.images = new BehaviorSubject<Image[]>([]).asObservable();
  }
  private getImagesPagination(
    { pageIndex, pageSize }: Pagination,
    value: string
  ): Observable<Image[]> {
    return this.searchService
      .searchImages(
        { pageIndex, pageSize, value },
        { category: this.currentCategory.value }
      )
      .pipe(
        catchError((err) => {
          throw err.message;
        })
      );
  }
}
