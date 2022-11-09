import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ISignUpRequest, ISignUpResponse } from '../models/auth.interceptor.models';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient) {}

  editUserData(fields: ISignUpRequest) {
    this.http.put<ISignUpResponse>('userId', fields).subscribe((data) => {
      data;
    });
  }
}
