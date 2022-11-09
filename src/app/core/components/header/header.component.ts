import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public headerService: HeaderService, private router: Router) {}

  public navigateToSignUp() {
    this.router.navigate(['auth/signUp']);
  }

  public navigateToLogIn() {
    this.router.navigate(['auth/logIn']);
  }
}
