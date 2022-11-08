import { Component, HostBinding } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private headerService: HeaderService) {}

  @HostBinding('class') get themeMode() {
    return this.headerService.isDarkTheme ? 'dark-theme' : 'light-theme';
  }
}
