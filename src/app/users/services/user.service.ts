import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { IUpdatedUserData, IUser } from 'src/app/users/store/models/users.models';
import { BASE_URL } from 'src/app/core/constants/interceptors.constants';
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

  public getUserById(): Observable<IUser> {
    const id = this.getUserIdFromToken();

    if (id) {
      return this.http.get<IUser>(`${BASE_URL}users/${id}`);
    }

    return this.http.get<IUser>('');
  }

  public updateUserById(updatedUserData: IUpdatedUserData): Observable<IUser> {
    const id = this.getUserIdFromToken();

    if (id) {
      return this.http.put<IUser>(`${BASE_URL}users/${id}`, updatedUserData);
    }

    return this.http.put<IUser>('', { params: { id } });
  }

  public deleteUserById(): Observable<IUser> {
    const id = this.getUserIdFromToken();

    if (id) {
      return this.http.delete<IUser>(`${BASE_URL}users/${id}`);
    }

    return this.http.delete<IUser>('');
  }

  public deleteUser(): void {
    this.store.dispatch(deleteUserById());
    window.localStorage.clear();
  }
}
