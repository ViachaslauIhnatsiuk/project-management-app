import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiEndpoints, Methods } from '../models/interceptors.models';
import { ResponseHandlerService } from '../services/response-handler.service';
import { PointsResponseMessages } from '../models/points-interceptor.model';

@Injectable()
export class PointsInterceptor implements HttpInterceptor {
  constructor(private responseHandlerService: ResponseHandlerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(ApiEndpoints.Points)) {
      return next.handle(request.clone()).pipe(
        tap((data) => {
          if (data instanceof HttpResponse) {
            const { status } = data;
            let message: string;
            switch (request.method) {
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
      );
    }

    return next.handle(request);
  }
}
