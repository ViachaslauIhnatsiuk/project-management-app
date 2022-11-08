import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ILogInRequest,
  ILogInResponse,
  ISignUpRequest,
  ISignUpResponse,
} from 'src/app/core/models/auth.interceptor.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signUp(fields: ISignUpRequest) {
    this.http.post<ISignUpResponse>('signup', { ...fields }).subscribe((data) => {
      localStorage.setItem('userName', fields.name);
      this.router.navigate(['auth/logIn']);
      console.log('SIGN UP RESPONSE: ', data);
    });
  }

  signIn(fields: ILogInRequest) {
    this.http.post<ILogInResponse>('signin', { ...fields }).subscribe((data) => {
      localStorage.setItem('userLogin', fields.login);
      localStorage.setItem('token', data.token);
      this.router.navigate(['']);
      console.log('LOG IN RESPONSE: ', data);
    });
  }

  closeForm() {
    this.router.navigate(['']);
  }
}
