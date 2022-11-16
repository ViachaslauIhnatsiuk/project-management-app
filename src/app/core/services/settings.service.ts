import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IEditUserDataRequest,
  IEditUserDataResponse,
} from 'src/app/core/models/settings-interceptor.models';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public passwordVisibility = false;

  constructor(private http: HttpClient) {}

  public editUserData(id: string, fields: IEditUserDataRequest): void {
    this.http
      .put<IEditUserDataResponse>('users', fields, { params: { id } })
      .subscribe((data) => data);
  }

  public deleteUser(id: string): void {
    this.http.delete<IEditUserDataResponse>('users', { params: { id } }).subscribe((data) => data);
  }

  public changePasswordVisibility(event: Event): void {
    event.preventDefault();
    this.passwordVisibility = !this.passwordVisibility;
  }
}
