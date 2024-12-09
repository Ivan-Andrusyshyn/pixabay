import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ImageItemComponent } from '../image-item/image-item.component';
import Image from '../../common/interfaces/image.interface';
import { ImageDetailsComponent } from '../image-details/image-details.component';

@Component({
  selector: 'app-image-list',
  standalone: true,
  imports: [NgFor, NgIf, ImageItemComponent],
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.scss',
})
export class ImageListComponent {
  @Input() images!: Image[];
  private readonly dialog = inject(MatDialog);

  openDialog(image: Image) {
    const dialogRef = this.dialog.open(ImageDetailsComponent, { data: image });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
