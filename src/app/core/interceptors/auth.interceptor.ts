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
} from 'src/app/core/models/auth-interceptor.models';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private errorHandlerService: ErrorHandlerService) {}
  intercept(
    request: HttpRequest<ILogInRequest | ISignUpRequest>,
    next: HttpHandler,
  ): Observable<HttpEvent<ILogInResponse | ISignUpResponse | IResponseError>> {
    const url = `${BASE_URL}auth/${request.url}`;

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
          if (error instanceof HttpErrorResponse) {
            this.errorHandlerService.handleError(error);
          }
          return throwError(() => error);
        }),
      );
    }

    if (request.url.includes('signin')) {
      return next.handle(modifyRequest).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            this.errorHandlerService.handleError(error);
          }
          return throwError(() => error);
        }),
      );
    }

    return next.handle(request);
  }
}
