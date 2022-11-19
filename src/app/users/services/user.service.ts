import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

import { IUpdatedUserData, IUser } from '../store/models/users.models';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  public getUserIdFromToken(): string | null {
    const TOKEN = window.localStorage.getItem('token') as string;
    const { id } = jwtDecode<{ id: string }>(TOKEN);
    return id;
  }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`users`);
  }

  public getUserById(): Observable<IUser> {
    const id = this.getUserIdFromToken() as string;
    return this.http.get<IUser>('users', { params: { id } });
  }

  public updateUserById(updatedUserData: IUpdatedUserData): Observable<IUser> {
    const id = this.getUserIdFromToken() as string;
    return this.http.put<IUser>('users', { updatedUserData }, { params: { id } });
  }

  public deleteUserById(): Observable<IUser> {
    const id = this.getUserIdFromToken() as string;
    return this.http.delete<IUser>('users', { params: { id } });
  }
}
