import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { Themes } from './core/models/core.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private headerService: HeaderService, private overlayContainer: OverlayContainer) {}

  @HostBinding('class') get themeMode() {
    const overlayContainer = this.overlayContainer.getContainerElement();

    if (this.headerService.theme === Themes.Light) {
      overlayContainer.classList.remove(Themes.Dark);
      overlayContainer.classList.add(Themes.Light);
    } else {
      overlayContainer.classList.remove(Themes.Light);
      overlayContainer.classList.add(Themes.Dark);
    }

    return this.headerService.theme === Themes.Dark ? Themes.Dark : Themes.Light;
  }

  ngOnInit() {
    this.headerService.getCurrentLanguage();
    this.headerService.getCurrentTheme();
  }
}
