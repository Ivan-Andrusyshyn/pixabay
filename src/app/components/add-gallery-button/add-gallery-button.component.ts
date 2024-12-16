import { Component, inject, Input, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { GalleryService } from '../../common/services/gallery.service';
import { getImagesIds } from '../../common/utils/map-media';
import { MediaItem } from '../../common/interfaces/media.inteface';

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
  existInGallery$ = this.existInGallery.asObservable();

  ngOnInit(): void {
    this.galleryService.getAllImages().subscribe((images) => {
      const isExist = getImagesIds(images).includes(this.image.id);
      this.existInGallery.next(isExist);
    });
  }

  addToGallery() {
    const isExist = this.galleryService.imagesIds.includes(this.image.id);
    this.existInGallery.next(isExist);
    console.log(isExist);

    this.galleryService.addImage(this.image);
  }
}
