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
import { ResponseHandlerService } from '../services/response-handler.service';
import { BASE_URL } from '../constants/interceptors.constants';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private responseHandlerService: ResponseHandlerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('assets')) {
      return next.handle(request);
    }

    const url = `${BASE_URL}${request.url}`;
    return next
      .handle(
        request.clone({
          url,
          setHeaders: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }),
      )
      .pipe(
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
}
