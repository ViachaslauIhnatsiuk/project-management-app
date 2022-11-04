import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBoardsState } from '../models/boards.models';

const selectBoards = createFeatureSelector<IBoardsState>('boards');

const selectAllBoards = createSelector(selectBoards, (state) => state.boards);

const selectUpdatedBoard = createSelector(selectBoards, (state) => state.selectedForUpdateBoard);

export { selectBoards, selectAllBoards, selectUpdatedBoard };
