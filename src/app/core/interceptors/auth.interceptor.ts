import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BASE_URL } from 'src/app/core/constants/interceptors.constants';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiEndpointActions, ApiEndpoints } from '../models/interceptors.models';
import { AuthResponseMessages } from '../models/auth-interceptor.models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private responseHandlerService: ResponseHandlerService,
    private authService: AuthService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const [endpoint, endpointAction] = request.url.split('/');
    if (endpoint === ApiEndpoints.Auth) {
      const url = `${BASE_URL}${endpoint}/${endpointAction}`;
      return next.handle(request.clone({ url })).pipe(
        tap((data) => {
          if (data instanceof HttpResponse) {
            let message: string = '';
            if (endpointAction === ApiEndpointActions.Signup) {
              message = AuthResponseMessages.Signup;
            }
            if (endpointAction === ApiEndpointActions.Signin) {
              message = AuthResponseMessages.Signin;
            }
            this.responseHandlerService.handleResponse(data.status, message);
          }
        }),
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            const {
              status,
              error: { message },
            } = error;
            this.responseHandlerService.handleResponse(status, message);
          }
          return throwError(() => error);
        }),
      );
    }

    if (this.authService.isTokenExpired()) {
      const TOKEN = window.localStorage.getItem('token');
      request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${TOKEN}`) });
    }

    return next.handle(request);
  }
}
