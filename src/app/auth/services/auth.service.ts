import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import jwtDecode from 'jwt-decode';
import {
  ILogInRequest,
  ILogInResponse,
  ISignUpRequest,
  ISignUpResponse,
} from 'src/app/core/models/auth-interceptor.models';
import { IJWTPayload, MagicNumbers } from 'src/app/auth/models/auth-service.models';
import { getUser, logIn } from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

  public signUp(fields: ISignUpRequest): Observable<ISignUpResponse> {
    return this.http.post<ISignUpResponse>('signup', fields).pipe(
      map((response) => {
        const { login, password } = fields;
        this.store.dispatch(logIn({ login, password }));
        return response;
      }),
    );
  }

  public signIn(fields: ILogInRequest): Observable<ILogInResponse> {
    return this.http.post<ILogInResponse>('signin', fields).pipe(
      map((response) => {
        localStorage.setItem('token', response.token);
        const { id: userId } = this.getUserDataFromToken(response.token);
        this.store.dispatch(getUser({ userId }));
        return response;
      }),
    );
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
