import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderService } from 'src/app/core/services/header.service';
import { getUserById } from './users/store/actions/users.actions';

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
    this.store.dispatch(getUserById());
  }
}
