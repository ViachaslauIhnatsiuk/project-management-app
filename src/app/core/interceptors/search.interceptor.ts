import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/core/constants/interceptors.constants';
import { ApiEndpoints, Methods } from '../models/interceptors.models';

@Injectable()
export class SearchInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url === ApiEndpoints.TasksSet && request.method === Methods.Get) {
      const query = request.params.get('query');
      let url = `${BASE_URL}${request.url}?search=${query}`;

      return next.handle(request.clone({ url }));
    }

    return next.handle(request);
  }
}
