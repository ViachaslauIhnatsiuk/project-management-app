import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import {
  ILogInRequest,
  ILogInResponse,
  ISignUpRequest,
  ISignUpResponse,
} from 'src/app/core/models/auth-interceptor.models';
import { IJWTPayload } from 'src/app/auth/models/auth-service.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signUp(fields: ISignUpRequest) {
    this.http.post<ISignUpResponse>('signup', fields).subscribe(({ login }) => {
      const { password } = fields;
      this.signIn({ login, password });
    });
  }

  signIn(fields: ILogInRequest) {
    this.http.post<ILogInResponse>('signin', fields).subscribe(({ token }) => {
      const { id, login } = this.getUserDataFromToken(token);

      localStorage.setItem('userData', JSON.stringify({ id, login, token }));

      this.router.navigate(['']);
    });
  }

  closeForm() {
    this.router.navigate(['']);
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');

    if (!token) return false;

    const currentTime = Date.now();
    const decodedToken = jwtDecode<IJWTPayload>(token);
    if (decodedToken.exp) {
      const tokenExpireTime = decodedToken.exp * 1000;
      const timeDifference = tokenExpireTime - currentTime;
      return timeDifference > 0 ? true : false;
    } else {
      return false;
    }
  }

  getUserDataFromToken(token: string): Pick<IJWTPayload, 'id' | 'login'> {
    const { id, login } = jwtDecode<IJWTPayload>(token);

    return { id, login };
  }
}
