import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderService } from 'src/app/core/services/header.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { languages } from 'src/app/core/constants/header.constants';
import { selectAuthIsLoading } from 'src/app/auth/store/selectors/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public readonly languages: string[] = languages;

  public authIsLoading$ = this.store.select(selectAuthIsLoading);

  constructor(
    public headerService: HeaderService,
    public authService: AuthService,
    private store: Store,
  ) {}
}
