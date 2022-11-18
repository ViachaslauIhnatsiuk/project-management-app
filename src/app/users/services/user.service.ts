import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from '../store/models/users.models';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`users`);
  }

  public getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`users/${id}`);
  }

  public updateUserById(id: string, user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${id}`, user);
  }

  public deleteUserById(id: string): Observable<IUser> {
    return this.http.delete<IUser>(`${id}`);
  }
}
