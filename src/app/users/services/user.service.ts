import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { IUpdatedUserData, IUser } from 'src/app/users/store/models/users.models';
import { deleteUserById } from 'src/app/users/store/actions/users.actions';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { CustomMessages } from 'src/app/core/models/response-handler.models';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private store: Store,
    private responseHandlerService: ResponseHandlerService,
  ) {}

  public getUserIdFromToken(): string | void {
    const TOKEN = window.localStorage.getItem('token');

    if (TOKEN) {
      try {
        const { id } = jwtDecode<{ id: string }>(TOKEN);
        return id;
      } catch (error) {
        this.responseHandlerService.handleResponse(401, CustomMessages.Invalid);
      }
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
