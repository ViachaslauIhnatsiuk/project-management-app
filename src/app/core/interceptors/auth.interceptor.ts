import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BASE_URL } from 'src/app/core/constants/interceptors.constants';
import {
  ILogInRequest,
  ILogInResponse,
  IResponseError,
  ISignUpRequest,
  ISignUpResponse,
} from 'src/app/core/models/auth.interceptor.models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<ILogInRequest | ISignUpRequest>,
    next: HttpHandler,
  ): Observable<HttpEvent<ILogInResponse | ISignUpResponse | IResponseError>> {
    const url = `${BASE_URL}${request.url}`;

    const modifyRequest = request.clone({
      url,
      setHeaders: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (request.url.includes('signup')) {
      return next.handle(modifyRequest).pipe(
        catchError((error) => {
          let errorMsg = '';
          if (error instanceof HttpErrorResponse) {
            // TODO: Will be implement logic sets errors to toasterService
            if (error.status === 409) errorMsg = `Error CONFLICT: ${error.error.message}`;
          }
          return throwError(() => errorMsg);
        }),
      );
    }

    if (request.url.includes('signin')) {
      return next.handle(modifyRequest).pipe(
        catchError((error) => {
          let errorMsg = '';
          if (error instanceof HttpErrorResponse) {
            // TODO: Will be implement logic sets errors to toasterService
            if (error.status === 403) errorMsg = `Error FORBIDDEN: ${error.error.message}`;
          }
          return throwError(() => errorMsg);
        }),
      );
    }

    return next.handle(request);
  }
}
