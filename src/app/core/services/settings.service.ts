import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEditUserDataRequest, IEditUserDataResponse } from '../models/settings-interceptor.models';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public passwordVisibility = false;

  constructor(private http: HttpClient) {}

  public editUserData(fields: IEditUserDataRequest): void {
    this.http.put<IEditUserDataResponse>('userId', fields).subscribe((data) => {
      data;
    });
  }

  public deleteUser(): void {
    this.http.delete<IEditUserDataResponse>('userId').subscribe((data) => {
      data;
    });
  }

  public changePasswordVisibility(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
