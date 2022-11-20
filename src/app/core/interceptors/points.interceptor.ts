import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/core/constants/interceptors.constants';
import { ApiEndpoints } from '../models/interceptors.models';

@Injectable()
export class PointsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url === ApiEndpoints.Points) {
      const url = `${BASE_URL}${request.url}`;
      return next.handle(request.clone({ url }));
    }

    return next.handle(request);
  }
}
