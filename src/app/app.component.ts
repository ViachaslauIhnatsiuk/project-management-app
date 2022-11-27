import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { AfterViewChecked, Component, Inject, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { Themes } from './core/models/core.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewChecked {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private headerService: HeaderService,
    private overlayContainer: OverlayContainer,
  ) {}

  ngOnInit() {
    this.headerService.getCurrentLanguage();
    this.headerService.getCurrentTheme();
  }

  ngAfterViewChecked() {
    this.resetTheme();
  }

  resetTheme() {
    if (this.headerService.theme === Themes.Light) {
      this.document.body.classList.remove(Themes.Dark);
      this.overlayContainer.getContainerElement().classList.remove(Themes.Dark);
      this.document.body.classList.add(Themes.Light);
      this.overlayContainer.getContainerElement().classList.add(Themes.Light);
    } else {
      this.document.body.classList.remove(Themes.Light);
      this.overlayContainer.getContainerElement().classList.remove(Themes.Light);
      this.document.body.classList.add(Themes.Dark);
      this.overlayContainer.getContainerElement().classList.add(Themes.Dark);
    }
  }
}
