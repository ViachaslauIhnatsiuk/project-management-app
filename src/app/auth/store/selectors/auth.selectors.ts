import { IAuthState } from './../models/auth.models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectAuth = createFeatureSelector<IAuthState>('auth');

const selectUserId = createSelector(selectAuth, (state) => state.userId);
const selectUserName = createSelector(selectAuth, (state) => state.userName);
const selectUserLogin = createSelector(selectAuth, (state) => state.userLogin);
const selectToken = createSelector(selectAuth, (state) => state.token);
const selectIsLoading = createSelector(selectAuth, (state) => state.isLoading);
const selectError = createSelector(selectAuth, (state) => state.error);

export {
  selectAuth,
  selectUserId,
  selectUserName,
  selectUserLogin,
  selectToken,
  selectIsLoading,
  selectError,
};
