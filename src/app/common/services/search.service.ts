import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';

import resImages from '../interfaces/res-images.interface';
import apiKay from '../utils/apiKey';
import imageUrl from '../utils/image-url.enum';
import buildImageObject from '../utils/map-image';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private totalLength = new BehaviorSubject<number>(0);
  constructor(private readonly http: HttpClient) {}
  getTotalNumber() {
    return this.totalLength.asObservable();
  }

  searchImages(
    pageIndex: number = 1,
    perPage: number = 10,
    value: string
  ): Observable<any> {
    return this.http
      .get<resImages>(
        `${imageUrl.base}?key=${apiKay}&page=${pageIndex}&q=${value}&per_page=${perPage}`
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
