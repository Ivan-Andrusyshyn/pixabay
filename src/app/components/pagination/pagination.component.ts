import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';

import { HomeService } from '../../common/services/home.service';

export interface Pagination {
  pageIndex: number;
  pageSize: number;
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [MatPaginatorModule, AsyncPipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  pageSize: number = 10;
  pageIndex: number = 1;
  pageSizeOptions: number[] = [10, 20];
  totalLength = new BehaviorSubject(0);
  totalLength$: Observable<number> = this.totalLength.asObservable();

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;

  @Output() onPageEvent = new EventEmitter<Pagination>();
  private homeService = inject(HomeService);

  ngOnInit(): void {
    this.totalLength$ = this.homeService.getTotalNumber();
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.totalLength.next(e.length);
    this.pageSize = e.pageSize;
    if (e.pageIndex) {
      this.pageIndex = e.pageIndex;
    } else {
      this.pageIndex = 1;
    }

    this.onPageEvent.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    });
  }
}
