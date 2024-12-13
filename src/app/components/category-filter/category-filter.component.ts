import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [MatSelectModule, NgFor],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
})
export class CategoryFilterComponent {
  @Input() options!: string[];
  @Input() title: string = '';
  @Output() onSelect = new EventEmitter<string>();
  onCategoryChange(event: any): void {
    const selectedValue = event.value;
    this.onSelect.emit(selectedValue);
  }
}
