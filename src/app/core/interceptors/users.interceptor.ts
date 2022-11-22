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
import { UsersResponseMessages } from '../models/users-interceptor.models';
import { ApiEndpoints, Methods } from '../models/interceptors.models';

@Injectable()
export class UsersInterceptor implements HttpInterceptor {
  constructor(private responseHandlerService: ResponseHandlerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url === ApiEndpoints.Users) {
      const url = `${BASE_URL}${request.url}`;
      return next.handle(request.clone({ url })).pipe(
        tap((data) => {
          if (data instanceof HttpResponse) {
            const { status } = data;
            if (request.method === Methods.Put) {
              const message = UsersResponseMessages.Updated;
              this.responseHandlerService.handleResponse(status, message);
            }
            if (request.url === Methods.Delete) {
              const message = UsersResponseMessages.Deleted;
              this.responseHandlerService.handleResponse(status, message);
            }
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
