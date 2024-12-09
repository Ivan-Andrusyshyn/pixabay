import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ImageItemComponent } from '../image-item/image-item.component';
import Image from '../../common/interfaces/image.interface';

@Component({
  selector: 'app-image-list',
  standalone: true,
  imports: [NgFor, NgIf, ImageItemComponent],
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.scss',
})
export class ImageListComponent {
  @Input() images!: Image[];
}
