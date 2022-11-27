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
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { UsersResponseMessages } from '../models/users-interceptor.models';
import { ApiEndpoints, Methods } from '../models/interceptors.models';

@Injectable()
export class UsersInterceptor implements HttpInterceptor {
  constructor(private responseHandlerService: ResponseHandlerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(ApiEndpoints.Users)) {
      return next.handle(request.clone()).pipe(
        tap((data) => {
          if (data instanceof HttpResponse) {
            const { status } = data;
            if (request.method === Methods.Put) {
              const message = UsersResponseMessages.Updated;
              this.responseHandlerService.handleResponse(status, message);
            }
            if (request.method === Methods.Delete) {
              const message = UsersResponseMessages.Deleted;
              this.responseHandlerService.handleResponse(status, message);
            }
          }
        }),
      );
    }

    return next.handle(request);
  }
}
