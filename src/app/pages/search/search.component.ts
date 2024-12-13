import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  Observable,
  startWith,
} from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  Pagination,
  PaginationComponent,
} from '../../components/pagination/pagination.component';
import { ImageListComponent } from '../../components/image-list/image-list.component';
import Image from '../../common/interfaces/image.interface';
import { SearchService } from '../../common/services/search.service';
import { SearchControlComponent } from '../../components/search-control/search-control.component';
import { Category, Order } from '../../common/content/filter';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    PaginationComponent,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ImageListComponent,
    AsyncPipe,
    SearchControlComponent,
    NgIf,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  searchService = inject(SearchService);

  images: Observable<Image[]> = new BehaviorSubject<Image[]>([]).asObservable();

  searchControl = new FormControl('');
  optionsControl = new FormControl('');

  pageIndex = 1;
  pageSize = 10;
  options = [...Order, ...Category];
  totalLength$!: Observable<number>;

  constructor() {}

  ngOnInit(): void {
    combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(this.searchControl.value),
        debounceTime(500)
      ),
      this.optionsControl.valueChanges.pipe(
        startWith(this.optionsControl.value)
      ),
    ]).subscribe(([query, options]) => {
      if (query?.trim()) {
        this.images = this.getImagesPagination({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        });
      } else {
        this.resetSearch();
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

  handlePageEvent({ pageIndex, pageSize }: Pagination) {
    this.images = this.getImagesPagination({ pageIndex, pageSize });
  }

  private resetSearch() {
    this.searchService.resetTotalNumber();
    this.images = new BehaviorSubject<Image[]>([]).asObservable();
  }
  private getImagesPagination({
    pageIndex,
    pageSize,
  }: Pagination): Observable<Image[]> {
    const mainOptions = {
      pageIndex,
      pageSize,
      value: this.searchControl.value ?? '',
    };
    const selectedOptions = [...(this.optionsControl.value ?? '')];
    return this.searchService.searchImages(mainOptions, selectedOptions).pipe(
      catchError((err) => {
        throw err.message;
      })
    );
  }
}
