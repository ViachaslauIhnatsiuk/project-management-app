import { Injectable } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ICurrentLanguage } from 'src/app/core/models/header.models';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  public isDarkTheme = false;

  public isSideBarOpened = true;

  public currentLanguage: ICurrentLanguage = { en: true, ru: false };

  public switchTheme({ checked }: MatSlideToggleChange): void {
    this.isDarkTheme = checked;
  }

  public toggleSidebar(): void {
    this.isSideBarOpened = !this.isSideBarOpened;
  }

  public switchLanguage(): void {
    if (this.currentLanguage.en) {
      this.currentLanguage = { en: false, ru: true };
    } else {
      this.currentLanguage = { en: true, ru: false };
    }
  }
}
