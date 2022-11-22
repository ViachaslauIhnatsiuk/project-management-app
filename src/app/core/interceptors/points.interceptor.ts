import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BASE_URL } from 'src/app/core/constants/interceptors.constants';
import { ApiEndpoints, Methods } from '../models/interceptors.models';
import { ResponseHandlerService } from '../services/response-handler.service';
import { PointsResponseMessages } from '../models/points-interceptor.model';

@Injectable()
export class PointsInterceptor implements HttpInterceptor {
  constructor(private responseHandlerService: ResponseHandlerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(ApiEndpoints.Points)) {
      const url = `${BASE_URL}${request.url}`;
      return next.handle(request.clone({ url })).pipe(
        tap((data) => {
          if (data instanceof HttpResponse) {
            const { status } = data;
            let message: string;
            switch (request.method) {
              case Methods.Get:
                message = PointsResponseMessages.Founded;
                break;
              case Methods.Post:
                message = PointsResponseMessages.Created;
                break;
              case Methods.Patch:
                message = PointsResponseMessages.Updated;
                break;
              case Methods.Delete:
                message = PointsResponseMessages.Deleted;
                break;
              default:
                message = PointsResponseMessages.Default;
                break;
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
