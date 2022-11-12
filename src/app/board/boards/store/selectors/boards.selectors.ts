import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBoardsState } from '../models/boards.models';

const selectFeatureBoards = createFeatureSelector<IBoardsState>('boards');

const selectBoards = createSelector(selectFeatureBoards, (state) => state.boards);

const selectUserId = createSelector(selectFeatureBoards, (state) => state.userId);

export { selectFeatureBoards, selectBoards, selectUserId };
