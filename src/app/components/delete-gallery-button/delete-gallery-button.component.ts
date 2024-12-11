import { Component, inject, Input } from '@angular/core';
import { GalleryService } from '../../common/services/gallery.service';

@Component({
  selector: 'app-delete-gallery-button',
  standalone: true,
  imports: [],
  templateUrl: './delete-gallery-button.component.html',
  styleUrl: './delete-gallery-button.component.scss',
})
export class DeleteGalleryButtonComponent {
  @Input() imageId!: number;

  galleryService = inject(GalleryService);

  deleteFromGallery() {
    this.galleryService.deleteImage(this.imageId);
  }
}
