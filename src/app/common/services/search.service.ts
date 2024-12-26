import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';

import resImages from '../interfaces/res-images.interface';
import { buildMediaObject } from '../utils/map-media';
import requestBuilder from '../utils/request-builder';
import { GalleryService } from './gallery.service';

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
  constructor(
    private readonly http: HttpClient,
    private readonly galleryService: GalleryService
  ) {}

  getTotalNumber() {
    return this.totalLength.asObservable();
  }
  resetTotalNumber() {
    this.totalLength.next(0);
  }
  searchMedia(
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
          const { idList, mediaList } = buildMediaObject(isImages, hits);
          this.galleryService.mediaIds = idList;
          return { idList, mediaList };
        }),
        catchError((err) => {
          console.error(err.message);
          return of({ idList: [], mediaList: [] });
        }),
        map(({ idList, mediaList }) =>
          this.galleryService.checkMediaInGallery({ idList, mediaList })
        ),
        switchMap((observable) => observable)
      );
  }
}
