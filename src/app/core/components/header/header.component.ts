import { Component } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { languages } from 'src/app/core/constants/header.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public readonly languages: string[] = languages;

  constructor(public headerService: HeaderService, public authService: AuthService) {}
}
