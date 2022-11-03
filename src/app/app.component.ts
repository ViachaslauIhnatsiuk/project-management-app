import { Component, HostBinding } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public themeService: ThemeService) {}

  @HostBinding('class') get themeMode() {
    return this.themeService.isDarkTheme ? 'dark-theme' : 'light-theme';
  }
}
