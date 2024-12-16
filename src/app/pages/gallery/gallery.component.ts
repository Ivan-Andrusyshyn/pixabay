import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

import { GalleryService } from '../../common/services/gallery.service';
import { RouterLink } from '@angular/router';
import { MediaListComponent } from '../../components/media-list/media-list.component';
import { MediaItem } from '../../common/interfaces/media.inteface';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [MediaListComponent, RouterLink, NgIf, AsyncPipe],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
  media!: Observable<MediaItem[]>;
  private galleryService = inject(GalleryService);

  ngOnInit(): void {
    this.media = this.galleryService.getAllImages();
  }
}
