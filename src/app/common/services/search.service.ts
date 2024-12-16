import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';

import resImages from '../interfaces/res-images.interface';
import { buildMediaObject } from '../utils/map-media';
import requestBuilder from '../utils/request-builder';

interface Search {
  isImages: boolean;
  pageIndex: number;
  pageSize: number;
  value: string;
}
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private totalLength = new BehaviorSubject<number>(0);
  constructor(private readonly http: HttpClient) {}

  getTotalNumber() {
    return this.totalLength.asObservable();
  }
  resetTotalNumber() {
    this.totalLength.next(0);
  }
  searchImages(
    { isImages, pageIndex = 1, pageSize = 10, value }: Search,
    options: string[]
  ): Observable<any> {
    return this.http
      .get<resImages>(
        requestBuilder(isImages, pageIndex, pageSize, value, options)
      )
      .pipe(
        map(({ hits, totalHits }) => {
          this.totalLength.next(totalHits);
          return buildMediaObject(isImages, hits);
        }),
        catchError((err) => {
          throw err.message;
        })
      );
  }
}
