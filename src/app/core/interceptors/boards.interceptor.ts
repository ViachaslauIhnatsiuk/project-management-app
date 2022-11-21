import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/core/constants/interceptors.constants';
import { ApiEndpoints, Methods } from '../models/interceptors.models';

@Injectable()
export class BoardsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (
      request.url.includes(ApiEndpoints.Boards) ||
      request.url.includes(ApiEndpoints.Columns) ||
      (request.url.includes(ApiEndpoints.Tasks) && !request.url.includes(ApiEndpoints.TasksSet)) ||
      request.url.includes(ApiEndpoints.ColumnsSet) ||
      (request.url === ApiEndpoints.TasksSet && request.method === Methods.Patch)
    ) {
      const url = `${BASE_URL}${request.url}`;
      return next.handle(request.clone({ url }));
    }

    return next.handle(request);
  }
}
