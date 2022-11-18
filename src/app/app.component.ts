import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderService } from 'src/app/core/services/header.service';
import { getUser } from './auth/store/actions/auth.actions';
import { getUserId } from './board/boards/helpers/boards.helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private headerService: HeaderService, private store: Store) {}

  @HostBinding('class') get themeMode() {
    return this.headerService.isDarkTheme ? 'dark-theme' : 'light-theme';
  }

  ngOnInit() {
    const id = getUserId() as string;
    this.store.dispatch(getUser({ userId: id }));
  }
}
