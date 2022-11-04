import { createReducer, on } from '@ngrx/store';
import {
  createBoard,
  createBoardError,
  createBoardSuccess,
  deleteBoard,
  deleteBoardError,
  deleteBoardSuccess,
  getBoards,
  getBoardsError,
  getBoardsSuccess,
  updateBoard,
  updateBoardError,
  updateBoardSuccess,
} from '../actions/boards.actions';
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
  on(createBoard, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(createBoardSuccess, (state, { newBoard }): IBoardsState => {
    return { ...state, isLoading: false, boards: [...state.boards, newBoard] };
  }),
  on(createBoardError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(deleteBoard, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(deleteBoardSuccess, (state, { idBoard }): IBoardsState => {
    const resultedBoards = [...state.boards].filter(({ id }) => id !== idBoard);
    return { ...state, isLoading: false, boards: resultedBoards };
  }),
  on(deleteBoardError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(updateBoard, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(updateBoardSuccess, (state, { updatedBoard }): IBoardsState => {
    const resultedBoards = [...state.boards].map((board) => {
      if (board.id === updatedBoard.id) {
        return updatedBoard;
      }

      return board;
    });

    return { ...state, isLoading: false, boards: resultedBoards };
  }),
  on(updateBoardError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
);

export { boardsReducer };
