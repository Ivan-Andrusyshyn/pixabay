import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-control',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-control.component.html',
  styleUrl: './search-control.component.scss',
})
export class SearchControlComponent {
  @Input() searchControl!: FormControl;
  @Output() clearInput = new EventEmitter();

  onClear() {
    this.clearInput.emit();
  }
}
