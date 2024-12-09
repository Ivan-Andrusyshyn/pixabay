import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';

import apiKay from '../utils/apiKey';
import imageUrl from '../utils/image-url.enum';
import resImages from '../interfaces/res-images.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private totalLength = new BehaviorSubject<number>(0);
  constructor(private readonly http: HttpClient) {}
  getTotalNumber() {
    return this.totalLength.asObservable();
  }
  getAllImages(pageIndex: number = 1, perPage: number = 10): Observable<any> {
    return this.http
      .get<resImages>(
        `${imageUrl.base}?key=${apiKay}&page=${pageIndex}&per_page=${perPage}`
      )
      .pipe(
        map(({ hits, totalHits }) => {
          this.totalLength.next(totalHits);

          return hits.map((image) => {
            return {
              tags: this.splitTags(image.tags),
              id: image.id,
              likes: image.likes,
              comments: image.comments,
              downloads: image.downloads,
              largeImageURL: image.largeImageURL,
            };
          });
        }),
        catchError((err) => {
          throw err.message;
        })
      );
  }

  private splitTags(tags: any) {
    return tags ? tags.split(',').map((tag: string) => tag.trim()) : [];
  }
}
