import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { UsersInterceptor } from 'src/app/core/interceptors/users.interceptor';
import { BoardsInterceptor } from 'src/app/core/interceptors/boards.interceptor';
import { AppInterceptor } from './app.interceptor';
import { PointsInterceptor } from './points.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BoardsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: PointsInterceptor, multi: true },
];
