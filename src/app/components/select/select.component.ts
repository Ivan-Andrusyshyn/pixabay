import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input() options!: string[];
  @Input() title: string = '';
  @Input() controller!: FormControl;
  @Input() isMultiSelector: boolean = false;
}
