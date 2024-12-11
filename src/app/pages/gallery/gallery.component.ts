import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

import { ImageListComponent } from '../../components/image-list/image-list.component';
import Image from '../../common/interfaces/image.interface';
import { GalleryService } from '../../common/services/gallery.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ImageListComponent, RouterLink, NgIf, AsyncPipe],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
  images!: Observable<Image[]>;
  private galleryService = inject(GalleryService);

  ngOnInit(): void {
    this.images = this.galleryService.getAllImages();
  }
}
