import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Input() pageSizeOptions: number[] = [10, 20];
  @Input() hidePageSize: boolean = false;
  @Input() showPageSizeOptions: boolean = true;
  @Input() showFirstLastButtons: boolean = true;
  @Input() disabled: boolean = false;
  @Input() totalLength: number = 0;

  @Output() onPageEvent = new EventEmitter<Pagination>();

  handlePageEvent(e: PageEvent) {
    this.totalLength = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.onPageEvent.emit({
      pageIndex: this.pageIndex + 1,
      pageSize: this.pageSize,
    });
  }
}
