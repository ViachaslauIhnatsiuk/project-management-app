import { createReducer, on } from '@ngrx/store';
import {
  deleteUserById,
  deleteUserByIdError,
  deleteUserByIdSuccess,
  getUserById,
  getUserByIdError,
  getUserByIdSuccess,
  getUsers,
  getUsersError,
  getUsersSuccess,
  updateUserById,
  updateUserByIdError,
  updateUserByIdSuccess,
} from '../actions/users.actions';
import { IUsersState } from '../models/users.models';
import { initialUsersState } from '../state/users.state';

const usersReducer = createReducer(
  initialUsersState,
  on(getUsers, (state): IUsersState => {
    return { ...state, isLoading: true };
  }),
  on(getUsersSuccess, (state, { users }): IUsersState => {
    return { ...state, isLoading: false, users };
  }),
  on(getUsersError, (state, { error }): IUsersState => {
    return { ...state, isLoading: false, error };
  }),
  on(getUserById, (state): IUsersState => {
    return { ...state, isLoading: true };
  }),
  on(getUserByIdSuccess, (state, { user }): IUsersState => {
    return { ...state, isLoading: false, user };
  }),
  on(getUserByIdError, (state, { error }): IUsersState => {
    return { ...state, isLoading: false, error };
  }),
  on(updateUserById, (state): IUsersState => {
    return { ...state, isLoading: true };
  }),
  on(updateUserByIdSuccess, (state, { updatedUser }): IUsersState => {
    return { ...state, isLoading: false, user: updatedUser };
  }),
  on(updateUserByIdError, (state, { error }): IUsersState => {
    return { ...state, isLoading: false, error };
  }),
  on(deleteUserById, (state): IUsersState => {
    return { ...state, isLoading: true };
  }),
  on(deleteUserByIdSuccess, (): IUsersState => {
    window.localStorage.clear();
    return { ...initialUsersState, isLoading: false, user: null };
  }),
  on(deleteUserByIdError, (state, { error }): IUsersState => {
    return { ...state, isLoading: false, error };
  }),
);

export { usersReducer };
