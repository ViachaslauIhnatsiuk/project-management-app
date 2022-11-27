import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { UsersInterceptor } from 'src/app/core/interceptors/users.interceptor';
import { AppInterceptor } from './app.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true },
];
