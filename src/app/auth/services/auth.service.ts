import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import {
  ILogInRequest,
  ILogInResponse,
  ISignUpRequest,
  ISignUpResponse,
} from 'src/app/core/models/auth-interceptor.models';
import { logOut } from 'src/app/auth/store/actions/auth.actions';
import { IJWTPayload, MagicNumbers } from 'src/app/auth/models/auth-service.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private store: Store) {}

  public signUp(fields: ISignUpRequest): Observable<ISignUpResponse> {
    return this.http.post<ISignUpResponse>('signup', fields);
  }

  public signIn(fields: ILogInRequest): Observable<ILogInResponse> {
    return this.http.post<ILogInResponse>('signin', fields);
  }

  public signOut(): void {
    window.localStorage.clear();
    this.store.dispatch(logOut());
    this.router.navigate(['']);
  }

  public getUser(id: string) {
    return this.http.get<ISignUpResponse>('users', { params: { id } });
  }

  public isTokenExpired(): boolean {
    const token = localStorage.getItem('token');

    if (!token) return false;

    const currentTime = Date.now();
    const decodedToken = jwtDecode<IJWTPayload>(token);
    if (decodedToken.exp) {
      const tokenExpireTime = decodedToken.exp * MagicNumbers.Thousand;
      const timeDifference = tokenExpireTime - currentTime;
      return timeDifference > MagicNumbers.Zero ? true : false;
    } else {
      return false;
    }
  }

  public getUserDataFromToken(token: string): Pick<IJWTPayload, 'id' | 'login'> {
    const { id, login } = jwtDecode<IJWTPayload>(token);

    return { id, login };
  }
}
