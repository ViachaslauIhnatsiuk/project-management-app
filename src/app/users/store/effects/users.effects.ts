import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import {
  deleteUserByIdSuccess,
  getUserByIdError,
  getUserByIdSuccess,
  getUsersError,
  getUsersSuccess,
  updateUserByIdSuccess,
} from '../actions/users.actions';
import { IUser, IUserError, UsersActions } from '../models/users.models';

@Injectable()
export class UsersEffects {
  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.GET_USERS),
      mergeMap(() => {
        return this.userService.getUsers().pipe(
          map((responseUsers) => getUsersSuccess({ users: responseUsers })),
          catchError((error: IUserError) => of(getUsersError({ error }))),
        );
      }),
    );
  });

  getUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.GET_USER_BY_ID),
      mergeMap(({ userId }: { userId: string }) => {
        return this.userService.getUserById(userId).pipe(
          map((user) => getUserByIdSuccess({ user })),
          catchError((error: IUserError) => of(getUserByIdError({ error }))),
        );
      }),
    );
  });

  updateUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.UPDATE_USER_BY_ID),
      mergeMap(({ user, userId }: { userId: string; user: IUser }) => {
        return this.userService.updateUserById(userId, user).pipe(
          map((updatedUser) => updateUserByIdSuccess({ updatedUser })),
          catchError((error: IUserError) => of(getUserByIdError({ error }))),
        );
      }),
    );
  });

  deleteUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.DELETE_USER_BY_ID),
      mergeMap(({ userId }: { userId: string }) => {
        return this.userService.deleteUserById(userId).pipe(
          map((deletedUser) => deleteUserByIdSuccess({ deletedUser })),
          catchError((error: IUserError) => of(getUserByIdError({ error }))),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private userService: UserService) {}
}
