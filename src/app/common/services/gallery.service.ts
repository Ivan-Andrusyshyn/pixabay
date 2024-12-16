import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MediaItem } from '../interfaces/media.inteface';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  constructor(private readonly http: HttpClient) {}

  private gallery = new BehaviorSubject<MediaItem[]>([]);
  imagesIds: number[] = [];

  addImage(image: MediaItem) {
    this.gallery.next([...this.gallery.value, image]);
  }

  deleteImage(imageId: number) {
    const filterImages = this.gallery.value.filter(
      (image) => image.id !== imageId
    );
    this.gallery.next(filterImages);
  }

  getAllImages() {
    return this.gallery.asObservable();
  }
}
