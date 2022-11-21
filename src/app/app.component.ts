import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { getUserById } from './users/store/actions/users.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private headerService: HeaderService,
    private store: Store,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  @HostBinding('class') get themeMode() {
    return this.headerService.isDarkTheme ? 'dark-theme' : 'light-theme';
  }

  ngOnInit() {
    this.store.dispatch(getUserById());
  }
}
