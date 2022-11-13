import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getToken } from 'src/app/board/boards/helpers/boards.helpers';

@Injectable()
export class BoardsInterceptor implements HttpInterceptor {
  public token = getToken();

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('boards')) {
      let headers: HttpHeaders = request.headers;

      if (this.token) {
        headers = request.headers.set('Authorization', `Bearer ${this.token}`);
      }

      return next.handle(
        request.clone({
          headers,
        }),
      );
    }

    return next.handle(request);
  }
}
