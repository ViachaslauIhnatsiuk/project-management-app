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
} from '../actions/auth.actions';
import { IAuthState } from '../models/auth.models';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<IAuthState>,
  ) {}

  logIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logIn),
      switchMap(({ login, password }) => {
        return this.authService.signIn({ login, password }).pipe(
          map(({ token }) => logInSuccess({ token })),
          tap(() => this.router.navigate([''])),
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
}
