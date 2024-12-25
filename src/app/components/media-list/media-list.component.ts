import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { MediaItemComponent } from '../image-item/image-item.component';
import { ImageDetailsComponent } from '../image-details/image-details.component';
import { SwitchMediaService } from '../../common/services/switchmedia.service';
import { MediaItem } from '../../common/interfaces/media.interface';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, MediaItemComponent],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
