import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MediaItemService {
  private isHomeRoute: boolean = false;
  private isGalleryRoute: boolean = false;
  constructor() {}

  getCurrentUrl(urlSegments: any[]): { gallery: boolean; home: boolean } {
    if (urlSegments[0].path === 'home') {
      this.isHomeRoute = true;
      this.isGalleryRoute = false;
    } else if (urlSegments[0].path === 'gallery') {
      this.isGalleryRoute = true;
      this.isHomeRoute = false;
    }
    return { gallery: this.isGalleryRoute, home: this.isHomeRoute };
  }
}
