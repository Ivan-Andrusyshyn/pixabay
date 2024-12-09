import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import Image from '../../common/interfaces/image.interface';

@Component({
  selector: 'app-image-item',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './image-item.component.html',
  styleUrl: './image-item.component.scss',
})
export class ImageItemComponent {
  @Input() image!: Image;
}
