import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';

import {
  Image,
  MediaItem,
  Video,
} from '../../common/interfaces/media.inteface';

@Component({
  selector: 'app-image-details',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './image-details.component.html',
  styleUrl: './image-details.component.scss',
})
export class ImageDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public mediaItem: MediaItem) {
    console.log('Полученные данные о картинке:', this.mediaItem);
  }

  isImage(item: any): item is Image {
    return 'largeImageURL' in item;
  }

  isVideo(item: any): item is Video {
    return 'video' in item;
  }
}
