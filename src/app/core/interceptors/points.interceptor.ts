import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/core/constants/interceptors.constants';

@Injectable()
export class PointsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('points')) {
      const TOKEN = window.localStorage.getItem('token');
      const url = `${BASE_URL}${request.url}`;
      return next.handle(
        request.clone({
          url,
          setHeaders: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }),
      );
    }

    return next.handle(request);
  }
}
