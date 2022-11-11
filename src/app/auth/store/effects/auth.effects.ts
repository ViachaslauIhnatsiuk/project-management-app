import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {
  logIn,
  logInError,
  logInSuccess,
  signUp,
  signUpError,
  signUpSuccess,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  logIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logIn),
      switchMap(({ login, password }) => {
        return this.authService.signIn({ login, password }).pipe(
          map(({ token }) => logInSuccess({ token })),
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
          map(({ _id, name, login }) => signUpSuccess({ _id, name, login })),
          catchError(({ error: { statusCode, message } }) =>
            of(signUpError({ statusCode, message })),
          ),
        );
      }),
    );
  });
}
