import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import {
  ILogInRequest,
  ILogInResponse,
  ISignUpRequest,
  ISignUpResponse,
} from 'src/app/core/models/auth-interceptor.models';
import { IJWTPayload } from 'src/app/auth/models/auth-service.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public signUp(fields: ISignUpRequest): Observable<ISignUpResponse> {
    return this.http.post<ISignUpResponse>('signup', fields);
  }

  public signIn(fields: ILogInRequest): Observable<ILogInResponse> {
    return this.http.post<ILogInResponse>('signin', fields);
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
      const tokenExpireTime = decodedToken.exp * 1000;
      const timeDifference = tokenExpireTime - currentTime;
      return timeDifference > 0 ? true : false;
    } else {
      return false;
    }
  }

  public getUserDataFromToken(token: string): Pick<IJWTPayload, 'id' | 'login'> {
    const { id, login } = jwtDecode<IJWTPayload>(token);

    return { id, login };
  }
}
