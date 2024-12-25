import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss',
})
export class HeaderNavComponent {
  @Input() routes!: any[];
  @Input() isAuth!: boolean;
  @Output() logout = new EventEmitter();

  onLogout() {
    this.logout.emit();
  }
}
