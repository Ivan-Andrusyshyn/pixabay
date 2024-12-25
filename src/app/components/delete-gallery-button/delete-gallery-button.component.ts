import { Component, DestroyRef, inject, Input } from '@angular/core';

import { GalleryService } from '../../common/services/gallery.service';
import { MediaItem } from '../../common/interfaces/media.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-delete-gallery-button',
  standalone: true,
  imports: [],
  templateUrl: './delete-gallery-button.component.html',
  styleUrl: './delete-gallery-button.component.scss',
})
export class DeleteGalleryButtonComponent {
  @Input() image!: MediaItem;

  private destroyRef = inject(DestroyRef);

  private galleryService = inject(GalleryService);

  deleteFromGallery() {
    const imageId = this.image._id as number;
    if (!imageId) console.error('Wrong id type');

    this.galleryService
      .deleteImage(imageId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        const filterMedia = this.galleryService.gallery.value.filter(
          (item) => item._id !== imageId
        );
        this.galleryService.gallery.next(filterMedia);
      });
  }
}
