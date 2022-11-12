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
import { IResponseError } from 'src/app/core/models/auth-interceptor.models';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { IGetUserRequest, IGetUserResponse } from '../models/users-interceptor.models';

@Injectable()
export class UsersInterceptor implements HttpInterceptor {
  private TOKEN = window.localStorage.getItem('token');

  constructor(private responseHandlerService: ResponseHandlerService) {}
  intercept(
    request: HttpRequest<IGetUserRequest>,
    next: HttpHandler,
  ): Observable<HttpEvent<IGetUserResponse | IResponseError>> {
    if (request.url.includes('users')) {
      return next.handle(this.getModifiedRequest(request)).pipe(
        tap((data) => {
          if (data instanceof HttpResponse) {
            const { status } = data;
            this.responseHandlerService.handleResponse(status, 'Founded user');
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

  private getModifiedRequest(request: HttpRequest<IGetUserRequest>): HttpRequest<IGetUserRequest> {
    const url = `${BASE_URL}users/${request.params.get('id')}`;

    return request.clone({
      url,
      setHeaders: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.TOKEN}`,
      },
    });
  }
}
