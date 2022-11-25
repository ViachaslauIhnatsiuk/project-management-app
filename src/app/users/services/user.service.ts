import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { IUpdatedUserData, IUser } from 'src/app/users/store/models/users.models';
import { deleteUserById } from 'src/app/users/store/actions/users.actions';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private store: Store) {}

  public getUserIdFromToken(): string | void {
    const TOKEN = window.localStorage.getItem('token');

    if (TOKEN) {
      const { id } = jwtDecode<{ id: string }>(TOKEN);
      return id;
    }
  }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('users');
  }

  public getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`users/${id}`);
  }

  public updateUserById(id: string, updatedUserData: IUpdatedUserData): Observable<IUser> {
    return this.http.put<IUser>(`users/${id}`, updatedUserData);
  }

  public deleteUserById(id: string): Observable<IUser> {
    return this.http.delete<IUser>(`users/${id}`);
  }

  public deleteUser(): void {
    const id = this.getUserIdFromToken() as string;
    this.store.dispatch(deleteUserById({ id }));
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('theme');
  }
}
