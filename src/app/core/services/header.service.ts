import { Injectable } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { TranslateService } from '@ngx-translate/core';
import { Themes } from '../models/core.models';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  public theme = 'light-theme';

  public sliderIsChecked = false;

  public isSideBarOpened = true;

  constructor(private translate: TranslateService) {}

  public switchTheme({ checked }: MatSlideToggleChange): void {
    const theme = checked ? Themes.Dark : Themes.Light;
    window.localStorage.setItem('theme', theme);
    this.theme = theme;
    this.sliderIsChecked = checked;
  }

  public toggleSidebar(): void {
    this.isSideBarOpened = !this.isSideBarOpened;
  }

  public getCurrentLanguage(): void {
    const currentLanguage = window.localStorage.getItem('language');
    if (currentLanguage) {
      this.translate.use(currentLanguage.toLowerCase());
    } else {
      this.translate.use('en');
    }
  }

  public getCurrentTheme(): void {
    const currentTheme = window.localStorage.getItem('theme');
    if (currentTheme && currentTheme === Themes.Dark) {
      this.theme = 'dark-theme';
      this.sliderIsChecked = true;
    } else {
      this.theme = 'light-theme';
      this.sliderIsChecked = false;
    }
  }
}
