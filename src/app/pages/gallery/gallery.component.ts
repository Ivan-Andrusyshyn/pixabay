import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

import { GalleryService } from '../../common/services/gallery.service';
import { RouterLink } from '@angular/router';
import { MediaListComponent } from '../../components/media-list/media-list.component';
import { MediaItem } from '../../common/interfaces/media.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [MediaListComponent, RouterLink, NgIf, AsyncPipe],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit {
  media$!: Observable<MediaItem[]>;
  private galleryService = inject(GalleryService);
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.galleryService
      .getGallery()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.media$ = this.galleryService.getAllMedia();
  }
}
