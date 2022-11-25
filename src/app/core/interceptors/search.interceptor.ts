import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints, Methods } from '../models/interceptors.models';

@Injectable()
export class SearchInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url === ApiEndpoints.TasksSet && request.method === Methods.Get) {
      const query = request.params.get('query');
      let url = `${request.url}?search=${query}`;

      return next.handle(request.clone({ url }));
    }

    return next.handle(request);
  }
}
