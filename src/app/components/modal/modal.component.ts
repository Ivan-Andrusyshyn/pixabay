import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogClose,
    MatDialogActions,
    MatDialogContent,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  readonly dialogRef = inject(MatDialogRef<any>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  onClose(): void {
    this.dialogRef.close();
  }
}
