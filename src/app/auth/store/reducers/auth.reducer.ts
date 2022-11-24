import { createReducer, on } from '@ngrx/store';
import {
  logIn,
  logInSuccess,
  logInError,
  logOut,
  signUp,
  signUpSuccess,
  signUpError,
} from '../actions/auth.actions';
import { initialAuthState } from '../auth.state';
import { IAuthState } from '../models/auth.models';

const authReducer = createReducer(
  initialAuthState,
  on(logIn, (state): IAuthState => {
    return { ...state, isLoading: true };
  }),
  on(logInSuccess, (state, { token }): IAuthState => {
    return { ...state, isLoading: false, isAuth: true, token };
  }),
  on(logInError, (state, { statusCode, message }): IAuthState => {
    return { ...state, isLoading: false, isAuth: false, error: { statusCode, message } };
  }),
  on(logOut, (): IAuthState => {
    return { ...initialAuthState };
  }),
  on(signUp, (state): IAuthState => {
    return { ...state, isLoading: true };
  }),
  on(signUpSuccess, (state): IAuthState => {
    return { ...state, isLoading: false };
  }),
  on(signUpError, (state, { statusCode, message }): IAuthState => {
    return { ...state, isLoading: false, error: { statusCode, message } };
  }),
);

export { authReducer };
