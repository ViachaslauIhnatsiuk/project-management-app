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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private responseHandlerService: ResponseHandlerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('signup')) {
      const url = `${BASE_URL}auth/${request.url}`;
      return next.handle(request.clone({ url })).pipe(
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
      const url = `${BASE_URL}auth/${request.url}`;
      return next.handle(request.clone({ url })).pipe(
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
}
