import { createReducer, on } from '@ngrx/store';
import {
  logIn,
  logInSuccess,
  logInError,
  signUp,
  signUpSuccess,
  signUpError,
  getUser,
  getUserSuccess,
  getUserError,
} from '../actions/auth.actions';
import { initialAuthState } from '../auth.state';
import { IAuthState } from '../models/auth.models';

const authReducer = createReducer(
  initialAuthState,
  on(logIn, (state): IAuthState => {
    return { ...state, isLoading: true };
  }),
  on(logInSuccess, (state, { token }): IAuthState => {
    return { ...state, isLoading: false, token };
  }),
  on(logInError, (state, { statusCode, message, type }): IAuthState => {
    return { ...state, isLoading: false, error: { statusCode, message, type } };
  }),
  on(signUp, (state): IAuthState => {
    return { ...state, isLoading: true };
  }),
  on(signUpSuccess, (state, { _id, name, login }): IAuthState => {
    return { ...state, isLoading: false, userId: _id, userName: name, userLogin: login };
  }),
  on(signUpError, (state, { statusCode, message, type }): IAuthState => {
    return { ...state, isLoading: false, error: { statusCode, message, type } };
  }),
  on(getUser, (state): IAuthState => {
    return { ...state, isLoading: true };
  }),
  on(getUserSuccess, (state, { _id, name, login }): IAuthState => {
    return { ...state, isLoading: false, userId: _id, userName: name, userLogin: login };
  }),
  on(getUserError, (state, { statusCode, message, type }): IAuthState => {
    return { ...state, isLoading: false, error: { statusCode, message, type } };
  }),
);

export { authReducer };
