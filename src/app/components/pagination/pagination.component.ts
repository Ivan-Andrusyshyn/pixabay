import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

export interface Pagination {
  pageIndex: number;
  pageSize: number;
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  pageSize: number = 10;
  pageIndex: number = 1;
  pageSizeOptions: number[] = [10, 20];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;

  @Output() onPageEvent = new EventEmitter<Pagination>();
  @Input() totalLength: number = 0;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.totalLength = e.length;
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
