import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
import { MediaItem } from '../interfaces/media.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private totalLength = new BehaviorSubject<number>(0);

  constructor(
    private readonly http: HttpClient,
    private galleryService: GalleryService
  ) {}

  getTotalNumber() {
    return this.totalLength.asObservable();
  }

  getAllImages(
    isImages = true,
    pageIndex: number = 1,
    perPage: number = 10,
    options: string[]
  ): Observable<MediaItem[]> {
    const value = '';

    return this.http
      .get<resImages>(
        requestBuilder(isImages, pageIndex, perPage, value, options)
      )
      .pipe(
        map(({ hits, totalHits }) => {
          this.totalLength.next(totalHits);
          const { idList, mediaList } = buildMediaObject(isImages, hits);
          this.galleryService.imagesIds = idList;
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
