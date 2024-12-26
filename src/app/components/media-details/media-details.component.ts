import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';

import {
  Image,
  MediaItem,
  Video,
} from '../../common/interfaces/media.interface';

@Component({
  selector: 'app-media-details',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './media-details.component.html',
  styleUrl: './media-details.component.scss',
})
export class MediaDetailsComponent {
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
