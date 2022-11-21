import { createAction, props } from '@ngrx/store';
import { AuthActions } from '../models/auth.models';

const logIn = createAction(
  AuthActions.LOGIN,
  props<{
    login: string;
    password: string;
  }>(),
);
const logInSuccess = createAction(AuthActions.LOGIN_SUCCESS, props<{ token: string }>());
const logInError = createAction(
  AuthActions.LOGIN_ERROR,
  props<{
    statusCode: string;
    message: string;
  }>(),
);

const logOut = createAction(AuthActions.LOGOUT);

const signUp = createAction(
  AuthActions.SIGNUP,
  props<{
    name: string;
    login: string;
    password: string;
  }>(),
);
const signUpSuccess = createAction(
  AuthActions.SIGNUP_SUCCESS,
  props<{
    _id: string;
    name: string;
    login: string;
  }>(),
);
const signUpError = createAction(
  AuthActions.SIGNUP_ERROR,
  props<{
    statusCode: string;
    message: string;
  }>(),
);

export { logIn, logInSuccess, logInError, logOut, signUp, signUpSuccess, signUpError };
