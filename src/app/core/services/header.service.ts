import { Injectable } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  public isDarkTheme = false;

  public sliderIsChecked = false;

  public isSideBarOpened = true;

  public switchTheme({ checked }: MatSlideToggleChange): void {
    this.isDarkTheme = checked;
    this.sliderIsChecked = checked;
  }

  public toggleSidebar(): void {
    this.isSideBarOpened = !this.isSideBarOpened;
  }
}
