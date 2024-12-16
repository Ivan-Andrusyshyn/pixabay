import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ImageItemComponent } from '../image-item/image-item.component';
import { ImageDetailsComponent } from '../image-details/image-details.component';
import { SwitchMediaService } from '../../common/services/switchmedia.service';
import { Observable } from 'rxjs';
import { MediaItem } from '../../common/interfaces/media.inteface';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, ImageItemComponent],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.scss',
})
export class MediaListComponent implements OnInit {
  @Input() media: MediaItem[] = [];

  private readonly dialog = inject(MatDialog);
  private readonly mediaService = inject(SwitchMediaService);

  isImages!: Observable<boolean>;

  ngOnInit(): void {
    this.isImages = this.mediaService.isImages$;
  }

  openDialog(image: MediaItem) {
    const dialogRef = this.dialog.open(ImageDetailsComponent, { data: image });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
