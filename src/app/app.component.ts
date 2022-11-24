import { Component, HostBinding, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { Themes } from './core/models/core.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private headerService: HeaderService) {}

  @HostBinding('class') get themeMode() {
    return this.headerService.isDarkTheme ? Themes.Dark : Themes.Light;
  }

  ngOnInit() {
    this.headerService.getCurrentLanguage();
    this.headerService.getCurrentTheme();
  }
}
