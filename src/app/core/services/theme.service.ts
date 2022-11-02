import { Injectable } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public isDarkTheme = false;

  public switchTheme({ checked }: MatSlideToggleChange) {
    this.isDarkTheme = checked;
  }
}
