import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants/interceptors.constants';

@Injectable()
export class BoardsInterceptor implements HttpInterceptor {
  private TOKEN = window.localStorage.getItem('token');

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers = request.headers.set('Authorization', `Bearer ${this.TOKEN}`);
    const url = `${BASE_URL}boards/${request.url}`;

    switch (request.url) {
      case 'boards':
        return next.handle(
          request.clone({
            url,
            headers,
          }),
        );
      default:
        return next.handle(request);
    }
  }
}
