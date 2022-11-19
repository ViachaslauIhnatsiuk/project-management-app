import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/core/constants/interceptors.constants';

@Injectable()
export class BoardsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (
      request.url.includes('boards') ||
      request.url.includes('columns') ||
      request.url.includes('tasks') ||
      request.url.includes('columnsSet') ||
      request.url.includes('tasksSet')
    ) {
      const url = `${BASE_URL}${request.url}`;
      const TOKEN = window.localStorage.getItem('token');
      let headers: HttpHeaders = request.headers;

      if (TOKEN) {
        headers = request.headers.set('Authorization', `Bearer ${TOKEN}`);
      }

      return next.handle(
        request.clone({
          url,
          headers,
        }),
      );
    }

    return next.handle(request);
  }
}
