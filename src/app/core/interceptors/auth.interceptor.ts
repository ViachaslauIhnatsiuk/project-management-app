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
import {
  ILogInRequest,
  ILogInResponse,
  IResponseError,
  ISignUpRequest,
  ISignUpResponse,
} from 'src/app/core/models/auth-interceptor.models';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private responseHandlerService: ResponseHandlerService) {}

  intercept(
    request: HttpRequest<ILogInRequest | ISignUpRequest>,
    next: HttpHandler,
  ): Observable<HttpEvent<ILogInResponse | ISignUpResponse | IResponseError>> {
    if (request.url.includes('signup')) {
      return next.handle(this.getModifiedRequest(request)).pipe(
        tap((data) => {
          if (data instanceof HttpResponse) {
            this.responseHandlerService.handleResponse(data.status, 'New user is created');
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

    if (request.url.includes('signin')) {
      return next.handle(this.getModifiedRequest(request)).pipe(
        tap((data) => {
          if (data instanceof HttpResponse) {
            this.responseHandlerService.handleResponse(data.status, 'Successeful login');
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

    return next.handle(request);
  }

  private getModifiedRequest(
    request: HttpRequest<ILogInRequest | ISignUpRequest>,
  ): HttpRequest<ILogInRequest | ISignUpRequest> {
    const url = `${BASE_URL}auth/${request.url}`;

    return request.clone({
      url,
      setHeaders: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
}
