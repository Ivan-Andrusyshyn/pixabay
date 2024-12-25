import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorize',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './unauthorize.component.html',
  styleUrl: './unauthorize.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizeComponent {}
