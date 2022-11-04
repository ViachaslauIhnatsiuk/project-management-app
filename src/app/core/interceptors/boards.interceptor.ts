import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/core.constants';

@Injectable()
export class BoardsInterceptor implements HttpInterceptor {
  private TOKEN = window.localStorage.getItem('token');

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers = request.headers.set('Authorization', `Bearer ${this.TOKEN}`);
    const url = `${API_URL}/${request.url}`;

    switch (request.url) {
      default:
        return next.handle(
          request.clone({
            url,
            headers,
          }),
        );
    }
  }
}
