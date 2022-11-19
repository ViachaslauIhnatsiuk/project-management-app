import { IAuthState } from './../models/auth.models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectAuth = createFeatureSelector<IAuthState>('auth');

const selectToken = createSelector(selectAuth, (state) => state.token);
const selectIsAuth = createSelector(selectAuth, (state) => state.isAuth);
const selectIsLoading = createSelector(selectAuth, (state) => state.isLoading);
const selectError = createSelector(selectAuth, (state) => state.error);

export { selectToken, selectIsAuth, selectIsLoading, selectError };
