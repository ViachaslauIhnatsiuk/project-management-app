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
import { Methods, UsersResponseMessages } from '../models/users-interceptor.models';

@Injectable()
export class UsersInterceptor implements HttpInterceptor {
  constructor(private responseHandlerService: ResponseHandlerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('users')) {
      const TOKEN = window.localStorage.getItem('token');
      const url = `${BASE_URL}users/${request.params.get('id')}`;
      return next
        .handle(
          request.clone({
            url,
            setHeaders: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }),
        )
        .pipe(
          tap((data) => {
            if (data instanceof HttpResponse) {
              const { status } = data;
              let message: string = UsersResponseMessages.Default;
              if (request.method === Methods.Get) {
                message = UsersResponseMessages.Founded;
              }
              if (request.method === Methods.Put) {
                message = UsersResponseMessages.Updated;
              }
              if (request.method === Methods.Delete) {
                message = UsersResponseMessages.Deleted;
              }
              this.responseHandlerService.handleResponse(status, message);
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
