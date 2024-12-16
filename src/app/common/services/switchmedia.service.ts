import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwitchMediaService {
  private isImages = new BehaviorSubject(true);
  isImages$ = this.isImages.asObservable();
  constructor() {}

  toggleMedia(value: boolean) {
    this.isImages.next(value);
  }
}
