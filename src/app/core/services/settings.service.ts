import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISignUpRequest, ISignUpResponse } from '../models/auth.interceptor.models';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public passwordVisibility = false;

  constructor(private http: HttpClient) {}

  public editUserData(fields: ISignUpRequest): void {
    this.http.put<ISignUpResponse>('userId', fields).subscribe((data) => {
      data;
    });
  }

  public changePasswordVisibility(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
