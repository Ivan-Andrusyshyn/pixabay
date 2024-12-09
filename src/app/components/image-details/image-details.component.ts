import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import Image from '../../common/interfaces/image.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-image-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './image-details.component.html',
  styleUrl: './image-details.component.scss',
})
export class ImageDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public image: Image) {
    console.log('Полученные данные о картинке:', this.image);
  }
}
