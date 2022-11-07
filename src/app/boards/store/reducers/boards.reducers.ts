import { createReducer, on } from '@ngrx/store';
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
  getBoardsError,
  getBoardsSuccess,
  updateBoard,
  updateBoardError,
  updateBoardSuccess,
} from '../actions/boards.actions';
import {
  createColumn,
  createColumnError,
  createColumnSuccess,
  deleteColumn,
  deleteColumnError,
  deleteColumnSuccess,
  getColumns,
  getColumnsError,
  getColumnsSuccess,
  updateColumn,
  updateColumnError,
  updateColumnSuccess,
} from '../actions/column.actions';
import { initialBoardsState } from '../state/boards.state';
import { IBoardsState } from '../models/boards.models';

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
  on(getBoardById, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(getBoardByIdSuccess, (state, { board: { columns } }): IBoardsState => {
    const sortedByOrderColumns = [...columns].sort((a, b) => a.order! - b.order!);
    return { ...state, isLoading: false, columns: sortedByOrderColumns };
  }),
  on(getBoardByIdError, (state, { error }): IBoardsState => {
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
  on(getColumns, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(getColumnsSuccess, (state, { columns }): IBoardsState => {
    const sortedByOrderColumns = [...columns].sort((a, b) => a.order! - b.order!);
    return { ...state, isLoading: false, columns: sortedByOrderColumns };
  }),
  on(getColumnsError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(createColumn, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(createColumnSuccess, (state, { newColumn }): IBoardsState => {
    return { ...state, isLoading: false, columns: [...state.columns, newColumn] };
  }),
  on(createColumnError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(deleteColumn, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(deleteColumnSuccess, (state, { idColumn }): IBoardsState => {
    const resultedColumns = [...state.columns].filter(({ id }) => id !== idColumn);
    return { ...state, isLoading: false, columns: resultedColumns };
  }),
  on(deleteColumnError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(updateColumn, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(updateColumnSuccess, (state, { updatedColumn }): IBoardsState => {
    const resultedColumns = [...state.columns].map((column) => {
      if (column.id === updatedColumn.id) {
        return updatedColumn;
      }

      return column;
    });

    return { ...state, isLoading: false, columns: resultedColumns };
  }),
  on(updateColumnError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
);

export { boardsReducer };
