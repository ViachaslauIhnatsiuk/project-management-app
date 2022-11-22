import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BASE_URL } from 'src/app/core/constants/interceptors.constants';
import { ApiEndpoints, Methods } from '../models/interceptors.models';
import { ResponseHandlerService } from '../services/response-handler.service';

@Injectable()
export class BoardsInterceptor implements HttpInterceptor {
  constructor(private responseHandlerService: ResponseHandlerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (
      request.url.includes(ApiEndpoints.Boards) ||
      request.url.includes(ApiEndpoints.Columns) ||
      (request.url.includes(ApiEndpoints.Tasks) && !request.url.includes(ApiEndpoints.TasksSet)) ||
      request.url.includes(ApiEndpoints.ColumnsSet) ||
      (request.url.includes(ApiEndpoints.TasksSet) && request.method === Methods.Patch)
    ) {
      const url = `${BASE_URL}${request.url}`;
      return next.handle(request.clone({ url })).pipe(
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
