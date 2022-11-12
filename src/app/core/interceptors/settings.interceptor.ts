import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BASE_URL } from 'src/app/core/constants/interceptors.constants';
import {
  IEditUserDataRequest,
  IEditUserDataResponse,
  IEditUserDataError,
} from 'src/app/core/models/settings-interceptor.models';

@Injectable()
export class SettingsInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<IEditUserDataRequest>,
    next: HttpHandler,
  ): Observable<HttpEvent<IEditUserDataResponse | IEditUserDataError>> {
    const url = `${BASE_URL}users/${request.url}`;

    const modifyRequest = request.clone({
      url,
      setHeaders: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return next.handle(modifyRequest).pipe(
      catchError((error) => {
        let errorMsg = '';
        if (error instanceof HttpErrorResponse) {
          // TODO: Will be implement logic sets errors to toasterService
          if (error.status === 409) errorMsg = `Error CONFLICT: ${error.message}`;
        }
        return throwError(() => errorMsg);
      }),
    );
  }
}
