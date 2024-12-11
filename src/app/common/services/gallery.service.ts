import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Image from '../interfaces/image.interface';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  constructor(private readonly http: HttpClient) {}

  private gallery = new BehaviorSubject<Image[]>([]);
  imagesIds: number[] = [];

  addImage(image: Image) {
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
