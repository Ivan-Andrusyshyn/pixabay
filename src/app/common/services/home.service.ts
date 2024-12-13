import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';

import resImages from '../interfaces/res-images.interface';
import { buildImageObject } from '../utils/map-image';
import requestBuilder from '../utils/request-builder';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private totalLength = new BehaviorSubject<number>(0);

  constructor(private readonly http: HttpClient) {}
  getTotalNumber() {
    return this.totalLength.asObservable();
  }

  getAllImages(
    pageIndex: number = 1,
    perPage: number = 10,
    options: string[]
  ): Observable<any> {
    const value = '';
    return this.http
      .get<resImages>(requestBuilder(pageIndex, perPage, value, options))
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
