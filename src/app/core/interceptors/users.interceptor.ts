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
export class UsersInterceptor implements HttpInterceptor {
  private TOKEN = window.localStorage.getItem('token');

  constructor(private responseHandlerService: ResponseHandlerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('users')) {
      const url = `${BASE_URL}users/${request.params.get('id')}`;
      return next
        .handle(
          request.clone({
            url,
            setHeaders: {
              Authorization: `Bearer ${this.TOKEN}`,
            },
          }),
        )
        .pipe(
          tap((data) => {
            if (data instanceof HttpResponse) {
              const { status } = data;
              console.log('Response: ', data);
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
}
