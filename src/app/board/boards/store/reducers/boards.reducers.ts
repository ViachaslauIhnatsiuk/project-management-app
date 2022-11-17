import { createReducer, on } from '@ngrx/store';

import { initialBoardsState } from '../state/boards.state';
import { IBoardsState } from '../models/boards.models';
import {
  createBoard,
  createBoardError,
  createBoardSuccess,
  deleteBoard,
  deleteBoardError,
  deleteBoardSuccess,
  getBoardById,
  getBoardByIdError,
  getBoardByIdSuccess,
  getBoards,
  getBoardsByUserId,
  getBoardsByUserIdError,
  getBoardsByUserIdSuccess,
  getBoardsError,
  getBoardsSuccess,
  updateBoard,
  updateBoardError,
  updateBoardSuccess,
} from '../actions/boards.actions';

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
  on(getBoardById, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(getBoardByIdSuccess, (state, { board }): IBoardsState => {
    return { ...state, isLoading: false, selectedBoard: board };
  }),
  on(getBoardByIdError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(getBoardsByUserId, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(getBoardsByUserIdSuccess, (state, { boards }): IBoardsState => {
    return { ...state, isLoading: false, boards };
  }),
  on(getBoardsByUserIdError, (state, { error }): IBoardsState => {
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
  on(deleteBoardSuccess, (state, { boardId }): IBoardsState => {
    const resultedBoards = [...state.boards].filter(({ _id }) => _id !== boardId);
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
      if (board._id === updatedBoard._id) {
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
