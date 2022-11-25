import { UserService } from 'src/app/users/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import {
  AuthResponseMessages,
  ILogInRequest,
  ILogInResponse,
  ISignUpRequest,
  ISignUpResponse,
} from 'src/app/core/models/auth-interceptor.models';
import { logOut } from 'src/app/auth/store/actions/auth.actions';
import { IJWTPayload, MagicNumbers } from 'src/app/auth/models/auth-service.models';
import { logIn } from '../store/actions/auth.actions';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { getUserById } from 'src/app/users/store/actions/users.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public passwordVisibility = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store,
    private userService: UserService,
    private responseHandlerService: ResponseHandlerService,
  ) {}

  public signUp(fields: ISignUpRequest): Observable<ISignUpResponse> {
    return this.http.post<ISignUpResponse>('auth/signup', fields).pipe(
      map((response) => {
        const { login, password } = fields;
        this.store.dispatch(logIn({ login, password }));
        return response;
      }),
    );
  }

  public signIn(fields: ILogInRequest): Observable<ILogInResponse> {
    return this.http.post<ILogInResponse>('auth/signin', fields).pipe(
      map((response) => {
        localStorage.setItem('token', response.token);
        const id = this.userService.getUserIdFromToken() as string;
        this.store.dispatch(getUserById({ id }));
        this.router.navigate(['/boards']);
        return response;
      }),
    );
  }

  public signOut(): void {
    this.store.dispatch(logOut());
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('theme');
    this.router.navigate(['/welcome']);
    this.responseHandlerService.handleResponse(200, AuthResponseMessages.Signout);
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

  public changePasswordVisibility(event: Event): void {
    event.preventDefault();
    this.passwordVisibility = !this.passwordVisibility;
  }
}
