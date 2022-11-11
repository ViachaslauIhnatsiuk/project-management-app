import { IAuthState } from './../models/auth.models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectAuth = createFeatureSelector<IAuthState>('auth');

// const selectAllBoards = createSelector(selectAuth, (state) => state.boards);

export { selectAuth };
