import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ISignUpRequest, ISignUpResponse } from '../models/auth.interceptor.models';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient, private router: Router) {}

  editUserData(fields: ISignUpRequest) {
    this.http.post<ISignUpResponse>('users/', fields).subscribe((data) => {
      localStorage.setItem('userName', fields.name);
      this.router.navigate(['auth/logIn']);
    });
  }
}
