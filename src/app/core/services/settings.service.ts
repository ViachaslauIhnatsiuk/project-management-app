import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public passwordVisibility = false;

  constructor() {}

  public changePasswordVisibility(event: Event): void {
    event.preventDefault();
    this.passwordVisibility = !this.passwordVisibility;
  }
}
