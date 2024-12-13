import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';

import resImages from '../interfaces/res-images.interface';
import { buildImageObject } from '../utils/map-image';
import { FilterService } from './filter.service';

interface Search {
  pageIndex: number;
  pageSize: number;
  value: string;
}
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private totalLength = new BehaviorSubject<number>(0);
  constructor(
    private readonly http: HttpClient,
    private readonly filterService: FilterService
  ) {}

  getTotalNumber() {
    return this.totalLength.asObservable();
  }
  resetTotalNumber() {
    this.totalLength.next(0);
  }
  searchImages(
    { pageIndex = 1, pageSize = 10, value }: Search,
    { category = '' }: { category: string }
  ): Observable<any> {
    return this.http
      .get<resImages>(
        this.filterService.buildRequest(pageIndex, pageSize, value, {
          category,
        })
      )
      .pipe(
        map(({ hits, totalHits }) => {
          this.totalLength.next(totalHits);
          return buildImageObject(hits);
        }),
        catchError((err) => {
          throw err.message;
        })
      );
  }
}
