import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-slide-toggle',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideToggleComponent {
  @Output() onToggle = new EventEmitter<boolean>();
  @Input() toggleTitle: string = 'images';

  isChecked: boolean = true;

  onToggleEvent(e: MatSlideToggleChange) {
    this.isChecked = e.checked;

    this.onToggle.emit(this.isChecked);
  }
}
