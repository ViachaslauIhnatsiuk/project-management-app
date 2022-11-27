import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const isTokenExpired = this.authService.isTokenExpired();
    if (isTokenExpired) {
      return true;
    }
    return this.router.parseUrl('/welcome');
  }
}
