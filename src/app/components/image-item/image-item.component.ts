import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute, UrlSegment } from '@angular/router';

import { AddGalleryButtonComponent } from '../add-gallery-button/add-gallery-button.component';
import { DeleteGalleryButtonComponent } from '../delete-gallery-button/delete-gallery-button.component';
import {
  Image,
  MediaItem,
  Video,
} from '../../common/interfaces/media.interface';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-media-item',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    DeleteGalleryButtonComponent,
    AddGalleryButtonComponent,
    AsyncPipe,
  ],
  templateUrl: './media-item.component.html',
  styleUrl: './media-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaItemComponent implements OnInit {
  @Input() mediaItem!: MediaItem;
  @Input() isImages!: boolean;
  @Output() openDialog = new EventEmitter();

  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  isHomeRoute: boolean = false;
  isGalleryRoute: boolean = false;
  isSearchRoute: boolean = false;
  isAuth$!: Observable<boolean>;

  ngOnInit(): void {
    this.isAuth$ = this.authService.isAuth$;
    this.route.url.subscribe((urlSegments) => {
      const { home, gallery, search } = this.getCurrentUrl(urlSegments);

      this.isHomeRoute = home;
      this.isGalleryRoute = gallery;
      this.isSearchRoute = search;
    });
  }
  private getCurrentUrl(urlSegments: UrlSegment[]) {
    const path = urlSegments[0]?.path || '';

    return {
      home: path === 'home',
      gallery: path === 'gallery',
      search: path === 'search-media',
    };
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
