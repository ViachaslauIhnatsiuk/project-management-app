import { createReducer, on } from '@ngrx/store';
import { getBoards, getBoardsError, getBoardsSuccess } from '../actions/boards.actions';
import { IBoardsState } from '../models/boards.models';
import { initialBoardsState } from '../state/boards.state';

const boardsReducer = createReducer(
  initialBoardsState,
  on(getBoards, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(getBoardsSuccess, (state, { boards }): IBoardsState => {
    return { ...state, isLoading: false, boards };
  }),
  on(getBoardsError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
);

export { boardsReducer };
