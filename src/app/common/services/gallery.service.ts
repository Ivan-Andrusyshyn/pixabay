import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

import {
  MediaIdResponse,
  MediaItem,
  MediaResponse,
} from '../interfaces/media.interface';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  constructor(private readonly http: HttpClient) {}

  gallery = new BehaviorSubject<MediaItem[]>([]);
  mediaIds: number[] = [];

  addImage(image: MediaItem) {
    return this.http
      .post<MediaResponse>(
        environment.apiUrl + '/gallery' + '/add-media',
        image
      )
      .pipe(
        catchError((err) => {
          throw err.message;
        })
      );
  }

  getGallery(): Observable<MediaItem[]> {
    return this.http.get<MediaResponse>(environment.apiUrl + '/gallery').pipe(
      catchError((err) => {
        throw err.message;
      }),
      map((res) => {
        this.gallery.next(res.media);
        return res.media;
      })
    );
  }
  getAllMediaByIdList(idList: number[]): Observable<number[]> {
    const token = sessionStorage.getItem('access_token');
    if (!token) return of([]);
    return this.http
      .post<MediaIdResponse>(environment.apiUrl + '/gallery' + '/id-list', {
        idList,
      })
      .pipe(
        catchError((err) => {
          throw err.message;
        }),
        map((res) => res.ids)
      );
  }
  deleteImage(imageId: number) {
    return this.http
      .delete<MediaResponse>(
        environment.apiUrl + '/gallery' + '/delete-media' + '/' + imageId
      )
      .pipe(
        catchError((err) => {
          throw err.message;
        })
      );
  }

  getAllMedia() {
    return this.gallery.asObservable();
  }

  checkMediaInGallery({
    idList,
    mediaList,
  }: {
    idList: number[];
    mediaList: MediaItem[];
  }): Observable<MediaItem[]> {
    return this.getAllMediaByIdList(idList).pipe(
      map((ids) => {
        return mediaList.map((item) => {
          return {
            ...item,
            isInGallery: ids.includes(item.mediaId),
          };
        });
      }),
      catchError((err) => {
        console.error('Error in check gallery:', err.message);
        return of(mediaList.map((item) => ({ ...item, isInGallery: false })));
      })
    );
  }
}
