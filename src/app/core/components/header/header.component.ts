import { AuthService } from 'src/app/auth/services/auth.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderService } from 'src/app/core/services/header.service';
import { selectUserId } from 'src/app/auth/store/selectors/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isAuth$ = this.store.select(selectUserId);

  constructor(
    public headerService: HeaderService,
    public authService: AuthService,
    private store: Store,
  ) {}
}
