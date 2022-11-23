import { Component, HostBinding } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private headerService: HeaderService, private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  @HostBinding('class') get themeMode() {
    return this.headerService.isDarkTheme ? 'dark-theme' : 'light-theme';
  }
}
