import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';

import apiKay from '../utils/apiKey';
import imageUrl from '../utils/image-url.enum';
import resImages from '../interfaces/res-images.interface';
import { buildImageObject } from '../utils/map-image';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private totalLength = new BehaviorSubject<number>(0);

  constructor(
    private readonly http: HttpClient,
    private readonly filterService: FilterService
  ) {}
  getTotalNumber() {
    return this.totalLength.asObservable();
  }

  getAllImages(
    pageIndex: number = 1,
    perPage: number = 10,
    { order = '' }
  ): Observable<any> {
    const value = '';
    return this.http
      .get<resImages>(
        this.filterService.buildRequest(pageIndex, perPage, value, {
          order,
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
