import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  Pagination,
  PaginationComponent,
} from '../../components/pagination/pagination.component';
import { MediaListComponent } from '../../components/media-list/media-list.component';
import { SearchService } from '../../common/services/search.service';
import { SearchControlComponent } from '../../components/search-control/search-control.component';
import { Category, Order } from '../../common/content/filter';
import { MediaItem } from '../../common/interfaces/media.interface';
import { SwitchMediaService } from '../../common/services/switchmedia.service';
import { SlideToggleComponent } from '../../components/slide-toggle/slide-toggle.component';
import { SelectComponent } from '../../components/select/select.component';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    PaginationComponent,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MediaListComponent,
    AsyncPipe,
    SearchControlComponent,
    SlideToggleComponent,
    SelectComponent,
    NgIf,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly searchService = inject(SearchService);
  private readonly mediaService = inject(SwitchMediaService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);

  images$!: Observable<MediaItem[]>;

  searchControl = new FormControl('');
  optionsControl: FormControl<any> = new FormControl('');

  isMultiSelector: boolean = true;
  pageIndex = 1;
  pageSize = 10;
  options = [...Order, ...Category];
  totalLength$!: Observable<number>;
  isImages: boolean = true;

  ngOnInit(): void {
    combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(this.searchControl.value),
        debounceTime(500)
      ),
      this.optionsControl.valueChanges.pipe(
        startWith(this.optionsControl.value)
      ),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([query, options]) => {
        if (query?.trim()) {
          this.images$ = this.getImagesPagination({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          });
        } else {
          this.resetSearch();
        }
      });
    this.setUserInterests();

    this.totalLength$ = this.searchService.getTotalNumber();
  }

  ngOnDestroy(): void {
    this.resetSearch();
  }

  private setUserInterests() {
    const userInterests: string[] =
      this.authService.getUserData()?.interest ?? [];
    if (userInterests.length > 0) {
      this.optionsControl.setValue(userInterests);
    } else {
      this.optionsControl.setValue('');
    }
  }
  clearInput() {
    this.searchControl.reset();
    this.optionsControl.reset();
    this.resetSearch();
  }
  onToggle(isToggle: boolean) {
    this.isImages = isToggle;
    this.mediaService.toggleMedia(isToggle);
  }

  handlePageEvent({ pageIndex, pageSize }: Pagination) {
    this.images$ = this.getImagesPagination({ pageIndex, pageSize });
  }

  private resetSearch() {
    this.searchService.resetTotalNumber();
    this.images$ = new BehaviorSubject<MediaItem[]>([]).asObservable();
  }

  private getImagesPagination({
    pageIndex,
    pageSize,
  }: Pagination): Observable<MediaItem[]> {
    const mainOptions = {
      isImages: this.isImages,
      pageIndex,
      pageSize,
      value: this.searchControl.value ?? '',
    };
    const options = this.optionsControl.value ?? '';
    const selectedOptions = [...options];
    return this.searchService.searchMedia(mainOptions, selectedOptions).pipe(
      catchError((err) => {
        throw err.message;
      })
    );
  }
}
