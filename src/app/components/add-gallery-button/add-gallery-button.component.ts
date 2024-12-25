import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { GalleryService } from '../../common/services/gallery.service';
import { MediaItem } from '../../common/interfaces/media.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-gallery-button',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './add-gallery-button.component.html',
  styleUrl: './add-gallery-button.component.scss',
})
export class AddGalleryButtonComponent implements OnInit {
  @Input() image!: MediaItem;

  private galleryService = inject(GalleryService);
  private existInGallery = new BehaviorSubject<boolean>(false);
  private destroyRef = inject(DestroyRef);
  existInGallery$ = this.existInGallery.asObservable();

  ngOnInit(): void {
    if (this.image.isInGallery) {
      this.existInGallery.next(true);
    } else {
      this.existInGallery.next(false);
    }
  }

  addToGallery() {
    const isExist = this.galleryService.imagesIds.includes(this.image.mediaId);
    this.existInGallery.next(isExist);

    this.galleryService
      .addImage(this.image)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
