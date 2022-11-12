import { IAuthState } from './../models/auth.models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectAuth = createFeatureSelector<IAuthState>('auth');

const selectToken = createSelector(selectAuth, (state) => state.token);

export { selectAuth, selectToken };
