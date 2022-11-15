import { Injectable } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  public isDarkTheme = false;

  public isSideBarOpened = true;

  public currentLanguage: string = 'English';

  public switchTheme({ checked }: MatSlideToggleChange): void {
    this.isDarkTheme = checked;
  }

  public toggleSidebar(): void {
    this.isSideBarOpened = !this.isSideBarOpened;
  }

  public switchLanguage(value: string): void {
    this.currentLanguage = value;
  }
}
