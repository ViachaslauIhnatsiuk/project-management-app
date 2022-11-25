import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { ApiEndpoints, Methods } from '../models/interceptors.models';

@Injectable()
export class SearchInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if (request.url.includes(ApiEndpoints.TasksSet) && request.method === Methods.Get) {
    //   const id = request.params.get('id');
    //   const query = request.params.get('query');

    //   let composeQueries: string[] = [];

    //   if (id) {
    //     composeQueries.push(`userId=${id}`);
    //   }
    //   if (query) {
    //     composeQueries.push(`search=${query}`);
    //   }
    //   // const url = `${request.url}?${composeQueries.join('&')}`;

    //   // return next.handle(request.clone({ url }));
    // }

    return next.handle(request);
  }
}
