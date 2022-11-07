import { Injectable } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  public isDarkTheme = false;
  public opened = false;

  public switchTheme({ checked }: MatSlideToggleChange): void {
    this.isDarkTheme = checked;
  }

  public toggleSidebar(): void {
    this.opened = !this.opened;
  }
}
