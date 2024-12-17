import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { AddGalleryButtonComponent } from '../add-gallery-button/add-gallery-button.component';
import { ActivatedRoute } from '@angular/router';
import { ImageItemService } from './media-item.service';
import { DeleteGalleryButtonComponent } from '../delete-gallery-button/delete-gallery-button.component';
import {
  Image,
  MediaItem,
  Video,
} from '../../common/interfaces/media.inteface';

@Component({
  selector: 'app-media-item',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    DeleteGalleryButtonComponent,
    AddGalleryButtonComponent,
  ],
  templateUrl: './media-item.component.html',
  styleUrl: './media-item.scss',
})
export class MediaItemComponent implements OnInit {
  @Input() mediaItem!: MediaItem;
  @Input() isImages!: boolean;
  @Output() openDialog = new EventEmitter();

  private route = inject(ActivatedRoute);
  private imageItemService = inject(ImageItemService);

  isHomeRoute: boolean = false;
  isGalleryRoute: boolean = false;

  ngOnInit(): void {
    this.route.url.subscribe((urlSegments) => {
      const { home, gallery } =
        this.imageItemService.getCurrentUrl(urlSegments);
      this.isHomeRoute = home;
      this.isGalleryRoute = gallery;
    });
  }

  onDialog() {
    this.openDialog.emit(this.mediaItem);
  }

  isImage(item: any): item is Image {
    return 'largeImageURL' in item;
  }

  isVideo(item: any): item is Video {
    return 'video' in item;
  }
}
