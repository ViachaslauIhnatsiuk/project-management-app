import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {
  logIn,
  logInError,
  logInSuccess,
  signUp,
  signUpError,
  signUpSuccess,
  getUser,
  getUserSuccess,
  getUserError,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store,
  ) {}

  logIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logIn),
      switchMap(({ login, password }) => {
        return this.authService.signIn({ login, password }).pipe(
          map(({ token }) => {
            localStorage.setItem('token', token);
            return logInSuccess({ token });
          }),
          tap(() => this.router.navigate(['/boards'])),
          catchError(({ error: { statusCode, message } }) => {
            return of(logInError({ statusCode, message }));
          }),
        );
      }),
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUp),
      switchMap(({ name, login, password }) => {
        return this.authService.signUp({ name, login, password }).pipe(
          map(({ _id, name, login }) => {
            this.store.dispatch(logIn({ login, password }));
            return signUpSuccess({ _id, name, login });
          }),
          catchError(({ error: { statusCode, message } }) =>
            of(signUpError({ statusCode, message })),
          ),
        );
      }),
    );
  });

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUser),
      switchMap(({ userId }) => {
        return this.authService.getUser(userId).pipe(
          map(({ _id, name, login }) => getUserSuccess({ _id, name, login })),
          catchError(({ error: { statusCode, message } }) =>
            of(getUserError({ statusCode, message })),
          ),
        );
      }),
    );
  });
}
