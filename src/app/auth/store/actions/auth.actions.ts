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

// const getUser = createAction(AuthActions.GET_USER, props<{ userId: string }>());
// const getUserSuccess = createAction(
//   AuthActions.GET_USER_SUCCESS,
//   props<{
//     _id: string;
//     name: string;
//     login: string;
//   }>(),
// );
// const getUserError = createAction(
//   AuthActions.GET_USER_ERROR,
//   props<{
//     statusCode: string;
//     message: string;
//   }>(),
// );

// const updateUser = createAction(
//   AuthActions.UPDATE_USER,
// props<{
//   name: string;
//   login: string;
//   password: string;
// }>(),
// );
// const updateUserSuccess = createAction(
//   AuthActions.UPDATE_USER_SUCCESS,
//   props<{
//     _id: string;
//     name: string;
//     login: string;
//   }>(),
// );
// const updateUserError = createAction(
//   AuthActions.UPDATE_USER_ERROR,
//   props<{
//     statusCode: string;
//     message: string;
//   }>(),
// );

// const deleteUser = createAction(AuthActions.DELETE_USER, props<{ userId: string }>());
// const deleteUserSuccess = createAction(
//   AuthActions.DELETE_USER_SUCCESS,
//   props<{
//     _id: string;
//     name: string;
//     login: string;
//   }>(),
// );
// const deleteUserError = createAction(
//   AuthActions.DELETE_USER_ERROR,
//   props<{
//     statusCode: string;
//     message: string;
//   }>(),
// );

export { logIn, logInSuccess, logInError, logOut, signUp, signUpSuccess, signUpError };
